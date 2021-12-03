import {
  defaultAuthorizationHeaderFormatter,
  getDefaultTokenDataSerializer,
} from '../defaults';
import { getUser } from '../../../../../users/';
import { DEFAULT_STORAGE_KEY as GuestTokenDefaultStorageKey } from '../token-providers/GuestTokenProvider';
import {
  MisconfiguredTokenProviderError,
  RefreshGuestUserAccessTokenError,
  RefreshUserAccessTokenError,
  TokenManagerNotLoadedException,
  UserSessionExpiredError,
} from '../errors';
import { postAnalytics } from '../../../../../analyticsService';
import { postGuestTokens } from '../../../../../authentication';
import { DEFAULT_STORAGE_KEY as UserTokenDefaultStorageKey } from '../token-providers/UserTokenProvider';
import AuthenticationConfigOptions from '../AuthenticationConfigOptions';
import AxiosAuthenticationTokenManager from '..';
import client from '../../../../client';
import moxios from 'moxios';
import TokenData from '../token-providers/TokenData';
import TokenKinds from '../token-providers/TokenKinds';

jest.useFakeTimers();

const mockGuestTokenRequester = jest.fn(() => {
  return Promise.resolve({
    accessToken: 'dummy_access_token',
    expiresIn: '12000',
  });
});

const mockUserTokenRequester = jest.fn(() => {
  return Promise.resolve({
    accessToken: 'dummy_access_token',
    expiresIn: '12000',
    refreshToken: 'dummy_refresh_token',
  });
});

const mockClientCredentialsTokenRequester = jest.fn(() => {
  return Promise.resolve({
    accessToken: 'dummy_access_token',
    expiresIn: '12000',
    refreshToken: 'dummy_refresh_token',
  });
});

const defaultOptions = {
  authorizationHeaderFormatter: defaultAuthorizationHeaderFormatter,
  guestTokenRequester: mockGuestTokenRequester,
  userTokenRequester: mockUserTokenRequester,
  clientCredentialsTokenRequester: mockClientCredentialsTokenRequester,
};

/**
 * Stubs an axios request using moxios with a response for the first and subsequent requests.
 *
 * @param {string} method - Method of the request to mock (GET, POST, PATCH...)
 * @param {string} url - The expected url of the request to match.
 * @param {*} firstRequestResponse - The response for the first request.
 * @param {*} nextRequestsResponse - The response for the subsequent requests.
 */
function stubMoxiosRequestOnce(
  method,
  url,
  firstRequestResponse,
  nextRequestsResponse,
) {
  moxios.stubOnce(method, url);

  const obj = moxios.stubs.mostRecent();
  let count = 0;
  Object.defineProperty(obj, 'response', {
    get: () => {
      count++;
      if (count > 1) {
        return nextRequestsResponse;
      }
      return firstRequestResponse;
    },
  });
}

describe('AxiosAuthenticationTokenManager', () => {
  let tokenManagerInstance;

  function createAndSetTokenManagerInstance(
    axiosInstance = client,
    options = defaultOptions,
  ) {
    if (tokenManagerInstance) {
      tokenManagerInstance.ejectInterceptors();
    }

    tokenManagerInstance = new AxiosAuthenticationTokenManager(
      axiosInstance,
      options,
    );
    return tokenManagerInstance;
  }

  beforeEach(async () => {
    moxios.install(client);
    jest.clearAllMocks();

    tokenManagerInstance = createAndSetTokenManagerInstance(client);

    await tokenManagerInstance.load();
  });

  afterEach(function () {
    if (tokenManagerInstance) {
      tokenManagerInstance.ejectInterceptors();
    }

    moxios.uninstall(client);
  });

  describe('Flows', () => {
    describe('Guest flow', () => {
      it('should create new guest tokens when there are no tokens and a request that needs authentication is made', async () => {
        moxios.stubRequest('/api/account/v1/users/me', {
          method: 'get',
          response: { id: 10000, isGuest: true },
          status: 200,
        });

        await getUser();

        expect(mockGuestTokenRequester).toHaveBeenCalledWith(
          { guestUserId: null },
          {
            [AuthenticationConfigOptions.IsGuestUserAccessTokenRequest]: true,
            [AuthenticationConfigOptions.NoAuthentication]: true,
          },
        );

        jest.clearAllMocks();

        await getUser();

        expect(mockGuestTokenRequester).not.toHaveBeenCalled();
      });

      it('should create a new guest token when a previously requested guest token expired and with the same user id', async () => {
        const mockUserId = 10000;

        moxios.stubRequest('/api/account/v1/users/me', {
          method: 'get',
          response: { id: mockUserId, isGuest: true },
          status: 200,
        });

        mockGuestTokenRequester.mockImplementationOnce(() => {
          return Promise.resolve({
            accessToken: 'dummy_access_token',
            expiresIn: '0', // The token returned expires immediatelly,
            userId: mockUserId, // The post guest tokens request does not currently returns a userId yet, so we fake it does here.
          });
        });

        await getUser();

        expect(mockGuestTokenRequester).toHaveBeenCalledWith(
          { guestUserId: null },
          {
            [AuthenticationConfigOptions.IsGuestUserAccessTokenRequest]: true,
            [AuthenticationConfigOptions.NoAuthentication]: true,
          },
        );

        jest.clearAllMocks();

        await getUser();

        expect(mockGuestTokenRequester).toHaveBeenCalledWith(
          {
            guestUserId: mockUserId,
          },
          {
            [AuthenticationConfigOptions.IsGuestUserAccessTokenRequest]: true,
            [AuthenticationConfigOptions.NoAuthentication]: true,
          },
        );
      });

      it('should wait for pending access token request if there is one', async () => {
        moxios.stubRequest('/api/account/v1/users/me', {
          method: 'get',
          response: { id: 10000, isGuest: true },
          status: 200,
        });

        let mockGuestTokenRequesterPromiseResolve;

        const mockGuestTokenRequesterPromise = new Promise(resolve => {
          mockGuestTokenRequesterPromiseResolve = resolve;
        });

        // Mock implementation to return our promise that will be resolved
        // later.
        mockGuestTokenRequester.mockImplementationOnce(() => {
          return mockGuestTokenRequesterPromise;
        });

        // Make concurrent requests to getUser that will
        // require a new access token.
        const firstGetUserPromise = getUser();
        const secondGetUserPromise = getUser();

        // Resolve the guest access token requester promise
        mockGuestTokenRequesterPromiseResolve({
          accessToken: 'dummy_access_token',
          expiresIn: '12000',
        });

        // Await the requests
        await Promise.all([firstGetUserPromise, secondGetUserPromise]);

        // Guest token requester should only be invoked one time.
        expect(mockGuestTokenRequester).toHaveBeenCalledTimes(1);
      });

      it('should not create a new guest token if the request does not need authentication and there are no guest tokens', async () => {
        moxios.stubRequest('/api/authentication/v1/guestTokens', {
          method: 'post',
          response: { accessToken: 'dummy_access_token', expiresIn: '12000' },
          status: 200,
        });

        await postGuestTokens(
          { guestUserId: null },
          {
            baseURL: '/api',
            [AuthenticationConfigOptions.NoAuthentication]: true,
          },
        );

        expect(mockGuestTokenRequester).not.toHaveBeenCalled();
      });

      it('should create a new guest token when a request fails with 401 and retry the request with the new token', async () => {
        stubMoxiosRequestOnce(
          'get',
          '/api/account/v1/users/me',
          { status: 401 },
          { status: 200, response: { id: 10000, isGuest: true } },
        );

        await getUser();

        expect(mockGuestTokenRequester).toHaveBeenCalledTimes(2);
      });

      it('should return a specific error if the refresh guest user access token request fails', async () => {
        // Force an error for the post guest tokens request
        mockGuestTokenRequester.mockImplementationOnce((data, config) => {
          return Promise.reject({
            config,
            response: { status: 500 },
            request: { data },
            isAxiosError: true,
          });
        });

        expect.assertions(2);

        try {
          await getUser();
        } catch (e) {
          expect(e).toBeInstanceOf(RefreshGuestUserAccessTokenError);
        }

        expect(mockGuestTokenRequester).toHaveBeenCalledTimes(1);
      });

      it('should return an error if after refreshing an access token successfully the request still fails', async () => {
        stubMoxiosRequestOnce(
          'get',
          '/api/account/v1/users/me',
          { status: 401 },
          { status: 500 },
        );

        expect.assertions(3);

        try {
          await getUser();
        } catch (e) {
          expect(e).toBeInstanceOf(Error);
          expect(e.response.status).toBe(500);
        }

        expect(mockGuestTokenRequester).toHaveBeenCalledTimes(2);
      });

      it('should return the original error if a request fails with 401 and the access token refresh fails', async () => {
        moxios.stubRequest('/api/account/v1/users/me', {
          method: 'get',
          status: 401,
        });

        mockGuestTokenRequester.mockImplementationOnce((data, config) => {
          return Promise.resolve({
            config,
            response: {
              status: 200,
              data: { accessToken: 'dummy_access_token', expiresIn: '12000' },
            },
            request: { data },
          });
        });

        mockGuestTokenRequester.mockImplementationOnce((data, config) => {
          return Promise.reject({
            config,
            response: { status: 500 },
            request: { data },
          });
        });

        expect.assertions(3);

        try {
          await getUser();
        } catch (e) {
          expect(e).toBeInstanceOf(Error);
          expect(e.response.status).toBe(401);
        }

        expect(mockGuestTokenRequester).toHaveBeenCalledTimes(2);
      });
    });

    describe('Authenticated user flow', () => {
      const mockUserTokenData = new TokenData({
        accessToken: 'dummy_access_token',
        expiresIn: '12000',
        refreshToken: 'dummy_refresh_token',
      });

      beforeEach(async () => {
        const selectTokenProviderSpy = jest.spyOn(
          tokenManagerInstance,
          'selectTokenProvider',
        );

        await tokenManagerInstance.setUserTokenData(mockUserTokenData, true);

        expect(selectTokenProviderSpy).toHaveBeenCalledWith(
          tokenManagerInstance.userTokenProvider,
        );
      });

      it('should create a new user token when a previously requested user token expired', async () => {
        await tokenManagerInstance.setUserTokenData(
          new TokenData({
            ...mockUserTokenData,
            expiresIn: '0',
            expiresTimeUtc: 0,
          }),
          true,
        );

        expect(tokenManagerInstance.currentTokenProvider).toBe(
          tokenManagerInstance.userTokenProvider,
        );

        moxios.stubRequest('/api/account/v1/users/me', {
          method: 'get',
          response: { id: 10000, isGuest: false },
          status: 200,
        });

        await getUser();

        expect(mockUserTokenRequester).toHaveBeenCalledTimes(1);

        expect(mockUserTokenRequester).toHaveBeenCalledWith(
          {
            grantType: 'refresh_token',
            refreshToken: mockUserTokenData.refreshToken,
          },
          {
            [AuthenticationConfigOptions.IsUserRefreshTokenRequest]: true,
            [AuthenticationConfigOptions.NoAuthentication]: true,
          },
        );
      });

      it('should wait for pending access token request if there is one', async () => {
        await tokenManagerInstance.setUserTokenData(
          new TokenData({
            ...mockUserTokenData,
            expiresIn: '0',
            expiresTimeUtc: 0,
          }),
          true,
        );

        expect(tokenManagerInstance.currentTokenProvider).toBe(
          tokenManagerInstance.userTokenProvider,
        );

        moxios.stubRequest('/api/account/v1/users/me', {
          method: 'get',
          response: { id: 10000, isGuest: false },
          status: 200,
        });

        let mockUserTokenRequesterPromiseResolve;

        const mockUserTokenRequesterPromise = new Promise(resolve => {
          mockUserTokenRequesterPromiseResolve = resolve;
        });

        // Mock implementation to return our promise that will be resolved
        // later.
        mockUserTokenRequester.mockImplementationOnce(() => {
          return mockUserTokenRequesterPromise;
        });

        // Make concurrent requests to getUser that will
        // require a new access token.
        const firstGetUserPromise = getUser();
        const secondGetUserPromise = getUser();

        // Resolve the guest access token requester promise
        mockUserTokenRequesterPromiseResolve({
          accessToken: 'dummy_access_token',
          expiresIn: '12000',
          refreshToken: 'dummy_refresh_token',
        });

        // Await the requests
        await Promise.all([firstGetUserPromise, secondGetUserPromise]);

        // User token requester should only be invoked one time.
        expect(mockUserTokenRequester).toHaveBeenCalledTimes(1);
      });

      it('should create a new user token when a request fails with 401 and retry the request with the new token', async () => {
        stubMoxiosRequestOnce(
          'post',
          '/api/marketing/v1/analytics',
          { status: 401 },
          { status: 200, response: {} },
        );

        // We use postAnalytics client here to test for other method of requests instead of only GETs.
        await postAnalytics({});

        expect(mockUserTokenRequester).toHaveBeenCalledTimes(1);

        expect(mockUserTokenRequester).toHaveBeenCalledWith(
          {
            grantType: 'refresh_token',
            refreshToken: mockUserTokenData.refreshToken,
          },
          {
            [AuthenticationConfigOptions.IsUserRefreshTokenRequest]: true,
            [AuthenticationConfigOptions.NoAuthentication]: true,
          },
        );
      });

      it('should handle user session expired errors', async () => {
        await tokenManagerInstance.setUserTokenData(
          new TokenData({
            ...mockUserTokenData,
            expiresIn: '0',
            expiresTimeUtc: 0,
          }), // Set a token that is expired to force a refresh access token request
          true,
        );

        // Reject the refresh access token request with an error within 400 range
        mockUserTokenRequester.mockImplementationOnce((data, config) => {
          return Promise.reject({
            config,
            response: { status: 401 },
            request: { data },
            isAxiosError: true,
          });
        });

        expect.assertions(4);

        try {
          await getUser();
        } catch (e) {
          expect(e).toBeInstanceOf(UserSessionExpiredError);
        }

        expect(mockUserTokenRequester).toHaveBeenCalledTimes(1);

        expect(tokenManagerInstance.currentTokenProvider).toBe(
          tokenManagerInstance.guestTokenProvider,
        );
      });

      it('should return a specific error if the refresh user access token request fails but the user session has not expired', async () => {
        await tokenManagerInstance.setUserTokenData(
          new TokenData({
            ...mockUserTokenData,
            expiresIn: '0',
            expiresTimeUtc: 0,
          }), // Set a token that is expired to force a refresh access token request
          true,
        );

        // Force a 500 error response to trigger another error that is not considered a user session expired error (i.e. an error within 400 range)
        mockUserTokenRequester.mockImplementationOnce((data, config) => {
          return Promise.reject({
            config,
            response: { status: 500 },
            request: { data },
            isAxiosError: true,
          });
        });

        expect.assertions(4);

        try {
          await getUser();
        } catch (e) {
          expect(e).toBeInstanceOf(RefreshUserAccessTokenError);
        }

        expect(mockUserTokenRequester).toHaveBeenCalledTimes(1);

        expect(tokenManagerInstance.currentTokenProvider).toBe(
          tokenManagerInstance.userTokenProvider,
        );
      });

      it('should return an error if after refreshing an access token successfully the request still fails', async () => {
        stubMoxiosRequestOnce(
          'get',
          '/api/account/v1/users/me',
          { status: 401 },
          { status: 500 },
        );

        expect.assertions(4);

        try {
          await getUser();
        } catch (e) {
          expect(e).toBeInstanceOf(Error);
          expect(e.response.status).toBe(500);
        }

        expect(mockUserTokenRequester).toHaveBeenCalledTimes(1);
      });

      it('should return the original error if a request fails with 401 and the access token refresh fails', async () => {
        moxios.stubRequest('/api/account/v1/users/me', {
          method: 'get',
          status: 401,
        });

        mockUserTokenRequester.mockImplementationOnce((data, config) => {
          return Promise.reject({
            config,
            response: { status: 500 },
            request: { data },
          });
        });

        expect.assertions(4);

        try {
          await getUser();
        } catch (e) {
          expect(e).toBeInstanceOf(Error);
          expect(e.response.status).toBe(401);
        }

        expect(mockUserTokenRequester).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Load', () => {
    it('should throw an error if a request is performed before token manager is loaded', () => {
      tokenManagerInstance = createAndSetTokenManagerInstance(client);

      expect(tokenManagerInstance.isLoaded).toBeFalsy();

      expect.assertions(1);

      expect(getUser()).rejects.toThrow(TokenManagerNotLoadedException);
    });

    it('should wait for the load promise completion when a request is performed while token manager is loading', async () => {
      const mockGetUserResponse = {
        id: 10000,
        isGuest: false,
      };

      const loadAfterTimeoutPromise = new Promise(resolve =>
        setTimeout(
          () =>
            resolve({
              accessToken: 'dummy_access_token',
              expiresIn: '12000',
            }),
          2000,
        ),
      );

      const optionsWithValidStorageProvider = {
        ...defaultOptions,
        storage: {
          provider: {
            getItem: jest.fn(() => loadAfterTimeoutPromise),
            setItem: jest.fn(),
            removeItem: jest.fn(),
          },
          serializer: {
            serializeTokenData: data => {
              return data;
            },
            deserializeTokenData: data => {
              return data;
            },
          },
        },
      };

      tokenManagerInstance = createAndSetTokenManagerInstance(
        client,
        optionsWithValidStorageProvider,
      );

      // Do not await this method in order to send a request while the
      tokenManagerInstance.load();

      expect(tokenManagerInstance.isLoading).toBe(true);

      moxios.stubRequest('/api/account/v1/users/me', {
        method: 'get',
        response: mockGetUserResponse,
        status: 200,
      });

      const getUserPromise = getUser();

      jest.advanceTimersByTime(2000);

      const result = await getUserPromise;

      expect(tokenManagerInstance.isLoading).toBe(false);
      expect(tokenManagerInstance.isLoaded).toBe(true);

      expect(result).toEqual(expect.objectContaining(mockGetUserResponse));
    });

    it('should not create new promises when calling .load() if token manager is still loading', async () => {
      tokenManagerInstance = createAndSetTokenManagerInstance(client);

      const loadPromiseFirstCall = tokenManagerInstance.load();

      expect(tokenManagerInstance.isLoading).toBe(true);

      const loadPromiseSecondCall = tokenManagerInstance.load();

      await loadPromiseSecondCall;

      expect(loadPromiseFirstCall).toBe(loadPromiseSecondCall);
    });

    it('should not create new promises when calling .load() if token manager has already been loaded', async () => {
      tokenManagerInstance = createAndSetTokenManagerInstance(client);

      const loadPromiseFirstCall = tokenManagerInstance.load();

      expect(tokenManagerInstance.isLoading).toBe(true);

      await loadPromiseFirstCall;

      expect(tokenManagerInstance.isLoaded).toBe(true);

      const loadPromiseSecondCall = tokenManagerInstance.load();

      await loadPromiseSecondCall;

      expect(loadPromiseFirstCall).toBe(loadPromiseSecondCall);
    });

    it('should raise an error if after loading, not even guest tokens can be retrieved', async () => {
      tokenManagerInstance = createAndSetTokenManagerInstance(
        client,
        defaultOptions,
      );

      // Invalidate guest token provider instance request to force an error
      tokenManagerInstance.guestTokenProvider.requester = null;

      expect.assertions(5);

      try {
        await tokenManagerInstance.load();
      } catch (e) {
        expect(e).toBeInstanceOf(MisconfiguredTokenProviderError);
        expect(tokenManagerInstance.loadError).toBe(e);
      }

      expect(tokenManagerInstance.isLoaded).toBe(false);
      expect(tokenManagerInstance.isLoading).toBe(false);

      try {
        await getUser();
      } catch (e) {
        expect(e).toBe(tokenManagerInstance.loadError);
      }
    });

    it("should return null if 'getActiveToken' is called before token manager is loaded", () => {
      tokenManagerInstance = createAndSetTokenManagerInstance();

      const activeToken = tokenManagerInstance.getActiveToken();

      expect(activeToken).toBe(null);
    });
  });

  describe('Events', () => {
    it('should call listener function for active token data changes events if it is set', async () => {
      const mockListener = jest.fn();

      const mockGuestTokenData = new TokenData({
        accessToken: 'dummy_access_token',
        expiresIn: '12000',
        userId: 10000,
      });

      expect(tokenManagerInstance.currentTokenProvider).toBe(
        tokenManagerInstance.guestTokenProvider,
      );

      tokenManagerInstance.setActiveTokenDataChangedEventListener(mockListener);

      tokenManagerInstance.guestTokenProvider.setTokenData(mockGuestTokenData);

      let expectedTokenEventData = {
        kind: TokenKinds.Guest,
        data: mockGuestTokenData,
      };

      expect(mockListener).toHaveBeenCalledWith(expectedTokenEventData);

      expect(tokenManagerInstance.getActiveToken()).toEqual(
        expectedTokenEventData,
      );

      const mockUserTokenData = new TokenData({
        accessToken: 'dummy_access_token',
        expiresIn: '12000',
        refreshToken: 'dummy_refresh_token',
      });

      mockListener.mockClear();

      await tokenManagerInstance.setUserTokenData(mockUserTokenData, true);

      expectedTokenEventData = {
        kind: TokenKinds.User,
        data: mockUserTokenData,
      };

      expect(mockListener).toHaveBeenCalledWith(expectedTokenEventData);

      expect(tokenManagerInstance.getActiveToken()).toEqual(
        expectedTokenEventData,
      );
    });

    it('should not throw if the listener for active token data changes is not a function', async () => {
      tokenManagerInstance.setActiveTokenDataChangedEventListener({});

      const raiseOnActiveTokenDataChangedEventSpy = jest.spyOn(
        tokenManagerInstance,
        'raiseOnActiveTokenDataChangedEvent',
      );

      await tokenManagerInstance.setUserTokenData(
        new TokenData({ accessToken: 'dummy_access_token' }),
        true,
      );

      expect(raiseOnActiveTokenDataChangedEventSpy).toHaveBeenCalled();
    });

    it('should call listener function for user session terminated events if it is set', async () => {
      const listener = jest.fn();

      tokenManagerInstance.setUserSessionTerminatedEventListener(listener);

      const mockUserTokenData = new TokenData({
        accessToken: 'dummy_access_token',
        expiresIn: '0',
        refreshToken: 'dummy_refresh_token',
      });

      await tokenManagerInstance.setUserTokenData(mockUserTokenData, true);

      // Simulate a rejection of the postTokens endpoint call
      // We need to send AuthenticationConfigOptions.IsUserRefreshTokenRequest to true here
      // because moxios default adapter will not add the config parameter passed by the token provider call
      // to indicate it is a user token refresh request.
      mockUserTokenRequester.mockImplementationOnce(() => {
        return Promise.reject({
          config: {
            [AuthenticationConfigOptions.IsUserRefreshTokenRequest]: true,
          },
          response: { status: 400 },
          isAxiosError: true,
        });
      });

      // Disregard the error, we are not interested on it for this test
      try {
        await getUser();
      } catch {}

      expect(listener).toHaveBeenCalledWith({
        kind: TokenKinds.User,
        data: mockUserTokenData,
      });
    });

    it('should not throw if the listener for user session terminated events is not a function', async () => {
      tokenManagerInstance.setUserSessionTerminatedEventListener({});

      const mockUserTokenData = new TokenData({
        accessToken: 'dummy_access_token',
        expiresIn: '0',
        refreshToken: 'dummy_refresh_token',
      });

      await tokenManagerInstance.setUserTokenData(mockUserTokenData, true);

      const raiseOnUserSessionTerminatedEventSpy = jest.spyOn(
        tokenManagerInstance,
        'raiseOnUserSessionTerminatedEvent',
      );

      expect(() => {
        // Here we will just force a call to logout...
        tokenManagerInstance.forceLogout();

        expect(raiseOnUserSessionTerminatedEventSpy).toHaveBeenCalled();
      }).not.toThrow();
    });
  });

  describe('Options', () => {
    describe('Validation', () => {
      it('should throw an error if no client is passed to the constructor', () => {
        expect(() => {
          tokenManagerInstance = new AxiosAuthenticationTokenManager();
        }).toThrow(
          "Missing 'client' parameter to 'AxiosAuthenticationTokenManager' constructor call",
        );
      });

      it('should throw an error if no options are passed to the constructor', () => {
        expect(() => {
          tokenManagerInstance = new AxiosAuthenticationTokenManager(client);
        }).toThrow(
          "Missing 'options' parameter to 'AxiosAuthenticationTokenManager' constructor call",
        );
      });

      it.each([
        'authorizationHeaderFormatter',
        'guestTokenRequester',
        'userTokenRequester',
      ])(
        "should throw an error if there are no value for option '%s'",
        option => {
          expect(() => {
            const finalOptions = {
              ...defaultOptions,
              [option]: undefined,
            };

            tokenManagerInstance = createAndSetTokenManagerInstance(
              client,
              finalOptions,
            );
          }).toThrow(`Invalid value for option '${option}'`);
        },
      );
    });

    describe('storage option', () => {
      const tokenDataSerializer =
        getDefaultTokenDataSerializer('my_secret_key');

      const mockGetItem = jest.fn(() =>
        tokenDataSerializer.serializeTokenData({
          accessToken: 'dummy_access_token',
          refreshToken: 'dummy_refresh_token',
          expiresIn: '12000',
          expiresTimeUtc: new Date().getTime() + 12000000,
          userId: 10000,
        }),
      );
      const mockSetItem = jest.fn();
      const mockRemoveItem = jest.fn();
      const mockUserStorageKey = 'My User Key';
      const mockGuestUserStorageKey = 'Guest User Key';

      const optionsWithValidStorageProvider = {
        ...defaultOptions,
        storage: {
          provider: {
            getItem: mockGetItem,
            setItem: mockSetItem,
            removeItem: mockRemoveItem,
          },
          serializer: tokenDataSerializer,
        },
      };

      it('should validate if the passed storage option value is correct', () => {
        expect(() => {
          const finalOptions = {
            ...defaultOptions,
            storage: () => {},
          };

          tokenManagerInstance = createAndSetTokenManagerInstance(
            client,
            finalOptions,
          );
        }).toThrow(
          "Invalid value for option 'storage'. Must be either undefined or an object",
        );

        expect(() => {
          const finalOptions = {
            ...defaultOptions,
            storage: undefined,
          };

          tokenManagerInstance = createAndSetTokenManagerInstance(
            client,
            finalOptions,
          );
        }).not.toThrow();

        expect(() => {
          const finalOptions = {
            ...defaultOptions,
            storage: {
              provider: localStorage,
              serializer: getDefaultTokenDataSerializer('secret_key'),
            },
          };

          tokenManagerInstance = createAndSetTokenManagerInstance(
            client,
            finalOptions,
          );
        }).not.toThrow();
      });

      it("should validate if the 'storage.provider' implements the Storage API", () => {
        expect(() => {
          const finalOptions = {
            ...defaultOptions,
            storage: {
              provider: {
                set: () => {}, // Make it set instead of setItem to provoke the error
                getItem: () => {},
                removeItem: () => {},
              },
            },
          };

          tokenManagerInstance = createAndSetTokenManagerInstance(
            client,
            finalOptions,
          );
        }).toThrow(
          "Invalid value for option 'storage.provider'. Make sure the value specified is an object implementing the Storage API.",
        );
      });

      it("should validate if a valid 'storage.serializer' option value was specified", () => {
        // Remove previously installed interceptors

        expect(() => {
          const finalOptions = {
            ...optionsWithValidStorageProvider,
            storage: {
              ...optionsWithValidStorageProvider.storage,
              serializer: {
                dummy_method: () => {},
              },
            },
          };

          tokenManagerInstance = createAndSetTokenManagerInstance(
            client,
            finalOptions,
          );
        }).toThrow(
          "Invalid value for option 'storage.serializer'. Make sure the value specified contains the methods 'deserializeTokenData' and 'serializeTokenData'.",
        );

        expect(() => {
          const finalOptions = {
            ...optionsWithValidStorageProvider,
            storage: {
              ...optionsWithValidStorageProvider.storage,
              serializer: undefined,
            },
          };

          tokenManagerInstance = createAndSetTokenManagerInstance(
            client,
            finalOptions,
          );
        }).toThrow(
          "Invalid value for option 'storage.serializer'. Make sure the value specified contains the methods 'deserializeTokenData' and 'serializeTokenData'.",
        );

        expect(() => {
          const finalOptions = {
            ...optionsWithValidStorageProvider,
            storage: {
              ...optionsWithValidStorageProvider.storage,
              serializer: null,
            },
          };

          tokenManagerInstance = createAndSetTokenManagerInstance(
            client,
            finalOptions,
          );
        }).toThrow(
          "Invalid value for option 'storage.serializer'. Make sure the value specified contains the methods 'deserializeTokenData' and 'serializeTokenData'.",
        );

        expect(() => {
          const finalOptions = {
            ...optionsWithValidStorageProvider,
            storage: {
              ...optionsWithValidStorageProvider.storage,
              serializer: {
                serializeTokenData: () => {},
                deserializeTokenData: () => {},
              },
            },
          };

          tokenManagerInstance = createAndSetTokenManagerInstance(
            client,
            finalOptions,
          );
        }).not.toThrow();
      });

      it("should call 'storage.provider' methods if a valid value is provided", async () => {
        tokenManagerInstance = createAndSetTokenManagerInstance(
          client,
          optionsWithValidStorageProvider,
        );

        await tokenManagerInstance.load();

        expect(mockGetItem).toHaveBeenNthCalledWith(
          1,
          GuestTokenDefaultStorageKey,
        );

        expect(mockGetItem).toHaveBeenNthCalledWith(
          2,
          UserTokenDefaultStorageKey,
        );

        expect(tokenManagerInstance.currentTokenProvider).toBe(
          tokenManagerInstance.userTokenProvider,
        );

        tokenManagerInstance.setUserTokenData(
          new TokenData({
            accessToken: 'dummy_access_token',
            expiresIn: '10000',
            refreshToken: 'dummy_refresh_token',
          }),
          true,
        );

        expect(mockSetItem).toHaveBeenNthCalledWith(
          1,
          UserTokenDefaultStorageKey,
          expect.any(String),
        );

        // Switching to guest token provider will automatically place a call to clear data of the userTokenProvider
        tokenManagerInstance.selectGuestTokenProvider();

        expect(tokenManagerInstance.currentTokenProvider).toBe(
          tokenManagerInstance.guestTokenProvider,
        );

        expect(mockRemoveItem).toHaveBeenCalledWith(UserTokenDefaultStorageKey);

        tokenManagerInstance.guestTokenProvider.setTokenData({
          accessToken: 'dummy_access_token',
          expiresIn: '12000',
          userId: 20000,
        });

        expect(mockSetItem).toHaveBeenNthCalledWith(
          2,
          GuestTokenDefaultStorageKey,
          expect.any(String),
        );
      });

      it('should allow to specify the storage keys for both the guest and user tokens', async () => {
        tokenManagerInstance = createAndSetTokenManagerInstance(client, {
          ...optionsWithValidStorageProvider,
          storage: {
            ...optionsWithValidStorageProvider.storage,
            userTokenStorageKey: mockUserStorageKey,
            guestTokenStorageKey: mockGuestUserStorageKey,
          },
        });

        await tokenManagerInstance.load();

        expect(mockGetItem).toHaveBeenNthCalledWith(1, mockGuestUserStorageKey);

        expect(mockGetItem).toHaveBeenNthCalledWith(2, mockUserStorageKey);

        expect(tokenManagerInstance.currentTokenProvider).toBe(
          tokenManagerInstance.userTokenProvider,
        );

        tokenManagerInstance.setUserTokenData(
          new TokenData({
            accessToken: 'dummy_access_token',
            expiresIn: '10000',
            refreshToken: 'dummy_refresh_token',
          }),
          true,
        );

        expect(mockSetItem).toHaveBeenNthCalledWith(
          1,
          mockUserStorageKey,
          expect.any(String),
        );

        // Switching to guest token provider will automatically place a call to clear data of the userTokenProvider
        tokenManagerInstance.selectGuestTokenProvider();

        expect(tokenManagerInstance.currentTokenProvider).toBe(
          tokenManagerInstance.guestTokenProvider,
        );

        expect(mockRemoveItem).toHaveBeenCalledWith(mockUserStorageKey);

        tokenManagerInstance.guestTokenProvider.setTokenData(
          new TokenData({
            accessToken: 'dummy_access_token',
            expiresIn: '12000',
            userId: 20000,
          }),
        );

        expect(mockSetItem).toHaveBeenNthCalledWith(
          2,
          mockGuestUserStorageKey,
          expect.any(String),
        );
      });

      it("should call 'storage.provider.removeItem' if '.clearData()' is called on 'AxiosAuthenticationTokenManager' instance", async () => {
        tokenManagerInstance = createAndSetTokenManagerInstance(
          client,
          optionsWithValidStorageProvider,
        );

        await tokenManagerInstance.load();

        jest.clearAllMocks();

        tokenManagerInstance.clearData();

        expect(mockRemoveItem).toHaveBeenNthCalledWith(
          1,
          GuestTokenDefaultStorageKey,
        );
        expect(mockRemoveItem).toHaveBeenNthCalledWith(
          2,
          UserTokenDefaultStorageKey,
        );
      });

      it('should load if the storage provider throws', async () => {
        const mockError = new Error('Mock error');

        const mockErrorGetItem = jest.fn(() => {
          throw mockError;
        });

        const optionsWithValidStorageProviderButThrows = {
          ...defaultOptions,
          storage: {
            provider: {
              getItem: mockErrorGetItem,
              setItem: jest.fn(),
              removeItem: jest.fn(),
            },
            serializer: {
              serializeTokenData: jest.fn(),
              deserializeTokenData: jest.fn(),
            },
          },
        };

        tokenManagerInstance = createAndSetTokenManagerInstance(
          client,
          optionsWithValidStorageProviderButThrows,
        );

        expect.assertions(4);

        try {
          await tokenManagerInstance.load();
        } catch (e) {
          expect(e).toBe(mockError);
        }

        expect(tokenManagerInstance.isLoading).toBe(false);
        expect(tokenManagerInstance.isLoaded).toBe(true);
        expect(tokenManagerInstance.loadError).toBeNull();
      });
    });

    describe('refreshTokenWindowOffset option', () => {
      it('should allow to specify a refresh token window offset', () => {
        const refreshTokenWindowOffset = 40000;

        tokenManagerInstance = createAndSetTokenManagerInstance(client, {
          ...defaultOptions,
          refreshTokenWindowOffset,
        });

        expect(TokenData.REFRESH_TOKEN_WINDOW_OFFSET).toBe(
          refreshTokenWindowOffset,
        );
      });
    });
  });

  describe('getAccessToken function', () => {
    it("should call the 'getAccessToken' function of the current provider", async () => {
      expect(tokenManagerInstance.currentTokenProvider).toBe(
        tokenManagerInstance.guestTokenProvider,
      );

      const getAccessTokenGuestUserSpy = jest.spyOn(
        tokenManagerInstance.guestTokenProvider,
        'getAccessToken',
      );
      const getAccessTokenUserSpy = jest.spyOn(
        tokenManagerInstance.userTokenProvider,
        'getAccessToken',
      );

      await tokenManagerInstance.getAccessToken();

      expect(getAccessTokenGuestUserSpy).toHaveBeenCalled();
      expect(getAccessTokenUserSpy).not.toHaveBeenCalled();

      await tokenManagerInstance.setUserTokenData(
        new TokenData({
          accessToken: 'dummy_access_token',
          expiresIn: '12000',
          refreshToken: 'dummy_refresh_token',
        }),
        true,
      );

      expect(tokenManagerInstance.currentTokenProvider).toBe(
        tokenManagerInstance.userTokenProvider,
      );

      jest.clearAllMocks();

      await tokenManagerInstance.getAccessToken();

      expect(getAccessTokenUserSpy).toHaveBeenCalled();
      expect(getAccessTokenGuestUserSpy).not.toHaveBeenCalled();

      tokenManagerInstance.currentTokenProvider = null;

      expect(() => tokenManagerInstance.getAccessToken()).not.toThrow();
    });
  });

  describe('setUserInfo function', () => {
    it('should call setUserId on the correct token provider instance', () => {
      const guestTokenProviderSetUserIdSpy = jest.spyOn(
        tokenManagerInstance.guestTokenProvider,
        'setUserId',
      );
      const userTokenProviderSetUserIdSpy = jest.spyOn(
        tokenManagerInstance.userTokenProvider,
        'setUserId',
      );

      const mockGuestUserId = 123456;
      const mockUserId = 654321;

      // Set token data for the guest token provider in order to trigger the onTokenDataChanged event.
      tokenManagerInstance.guestTokenProvider.setTokenData(
        new TokenData({
          accessToken: 'dummy_access_token',
          expiresIn: '12000',
        }),
      );

      tokenManagerInstance.setUserInfo({ isGuest: true, id: mockGuestUserId });

      expect(guestTokenProviderSetUserIdSpy).toHaveBeenCalledWith(
        mockGuestUserId,
      );
      expect(userTokenProviderSetUserIdSpy).not.toHaveBeenCalled();

      jest.clearAllMocks();

      tokenManagerInstance.setUserTokenData(
        new TokenData({
          accessToken: 'dummy_access_token',
          expiresIn: '12000',
          refreshToken: 'dummy_refresh_token',
        }),
      );
      tokenManagerInstance.setUserInfo({ isGuest: false, id: mockUserId });

      expect(userTokenProviderSetUserIdSpy).toHaveBeenCalledWith(mockUserId);
      expect(guestTokenProviderSetUserIdSpy).not.toHaveBeenCalled();

      jest.clearAllMocks();

      tokenManagerInstance.setUserInfo(null);

      expect(guestTokenProviderSetUserIdSpy).not.toHaveBeenCalled();
      expect(userTokenProviderSetUserIdSpy).not.toHaveBeenCalled();

      jest.clearAllMocks();

      tokenManagerInstance.setUserInfo({});

      expect(guestTokenProviderSetUserIdSpy).not.toHaveBeenCalled();
      expect(userTokenProviderSetUserIdSpy).not.toHaveBeenCalled();
    });
  });

  describe('Guest context operations', () => {
    it("should allow to add parameters to create guest token request through 'setGuestTokensContext'", async () => {
      const mockGetUserResponse = { id: 10000, isGuest: true };

      tokenManagerInstance.setUserInfo(mockGetUserResponse);

      const mockGuestTokensContext = {
        context_prop_1: 'context_prop_1',
        context_prop_2: 'context_prop_2',
      };

      tokenManagerInstance.setGuestTokensContext(mockGuestTokensContext);

      const expectedGuestContext = {
        guestUserId: mockGetUserResponse.id,
        ...mockGuestTokensContext,
      };

      expect(tokenManagerInstance.getCurrentGuestTokensContext()).toEqual(
        expectedGuestContext,
      );

      moxios.stubRequest('/api/account/v1/users/me', {
        method: 'get',
        response: mockGetUserResponse,
        status: 200,
      });

      await getUser();

      expect(mockGuestTokenRequester).toHaveBeenCalledWith(
        expectedGuestContext,
        {
          [AuthenticationConfigOptions.IsGuestUserAccessTokenRequest]: true,
          [AuthenticationConfigOptions.NoAuthentication]: true,
        },
      );
    });

    it("should allow to reset guest tokens context request through 'resetGuestTokensContext'", async () => {
      const mockGetUserResponse = { id: 10000, isGuest: true };

      tokenManagerInstance.setUserInfo(mockGetUserResponse);

      const mockGuestTokensContext = {
        context_prop_1: 'context_prop_1',
        context_prop_2: 'context_prop_2',
      };

      tokenManagerInstance.setGuestTokensContext(mockGuestTokensContext);

      const expectedGuestContext = {
        guestUserId: mockGetUserResponse.id,
        ...mockGuestTokensContext,
      };

      expect(tokenManagerInstance.getCurrentGuestTokensContext()).toEqual(
        expectedGuestContext,
      );

      tokenManagerInstance.resetGuestTokensContext();

      expect(tokenManagerInstance.getCurrentGuestTokensContext()).toEqual({
        guestUserId: mockGetUserResponse.id,
      });

      moxios.stubRequest('/api/account/v1/users/me', {
        method: 'get',
        response: mockGetUserResponse,
        status: 200,
      });

      await getUser();

      expect(mockGuestTokenRequester).toHaveBeenCalledWith(
        {
          guestUserId: mockGetUserResponse.id,
        },
        {
          [AuthenticationConfigOptions.IsGuestUserAccessTokenRequest]: true,
          [AuthenticationConfigOptions.NoAuthentication]: true,
        },
      );
    });
  });

  describe('Remember me', () => {
    it('should not save the user token if remember me is set to false', async () => {
      const tokenDataSerializer =
        getDefaultTokenDataSerializer('my_secret_key');

      const mockGetItem = jest.fn();
      const mockSetItem = jest.fn();
      const mockRemoveItem = jest.fn();

      const optionsWithValidStorageProvider = {
        ...defaultOptions,
        storage: {
          provider: {
            getItem: mockGetItem,
            setItem: mockSetItem,
            removeItem: mockRemoveItem,
          },
          serializer: tokenDataSerializer,
        },
      };

      tokenManagerInstance = createAndSetTokenManagerInstance(
        client,
        optionsWithValidStorageProvider,
      );

      await tokenManagerInstance.load();

      tokenManagerInstance.setRememberMe(false);

      tokenManagerInstance.setUserTokenData(
        new TokenData({
          accessToken: 'dummy_access_token',
          expiresIn: '12000',
          refreshToken: 'dummy_refresh_token',
        }),
        true,
      );

      expect(mockSetItem).not.toHaveBeenCalled();
    });
  });

  describe('Authentication config options', () => {
    it('should allow the developer to specify an access token to be used for a request', async () => {
      const mockUsedAccessTokenCallback = jest.fn();
      const mockAccessToken = 'mock_access_token';

      expect(tokenManagerInstance.currentTokenProvider).toBe(
        tokenManagerInstance.guestTokenProvider,
      );

      tokenManagerInstance.guestTokenProvider.setTokenData(
        new TokenData({
          accessToken: 'dummy_access_token',
          expiresIn: '12000',
        }),
      );

      moxios.stubRequest('/api/account/v1/users/me', {
        method: 'get',
        response: {},
        status: 200,
      });

      await getUser({
        [AuthenticationConfigOptions.AccessToken]: mockAccessToken,
        [AuthenticationConfigOptions.UsedAccessTokenCallback]:
          mockUsedAccessTokenCallback,
      });

      expect(mockGuestTokenRequester).not.toHaveBeenCalled();

      expect(mockUsedAccessTokenCallback).toHaveBeenCalledWith(mockAccessToken);
    });
  });

  describe('setUserTokenData function', () => {
    it('should not switch to the user token provider if switch parameter is false', () => {
      const mockUserTokenData = new TokenData({
        accessToken: 'dummy_access_token',
        expiresIn: '12000',
        refreshToken: 'dummy_refresh_token',
      });

      expect(tokenManagerInstance.currentTokenProvider).toBe(
        tokenManagerInstance.guestTokenProvider,
      );

      const userTokenProviderSetTokenDataSpy = jest.spyOn(
        tokenManagerInstance.userTokenProvider,
        'setTokenData',
      );

      tokenManagerInstance.setUserTokenData(mockUserTokenData, false);

      expect(tokenManagerInstance.currentTokenProvider).toBe(
        tokenManagerInstance.guestTokenProvider,
      );

      expect(userTokenProviderSetTokenDataSpy).toHaveBeenCalledWith(
        expect.objectContaining(mockUserTokenData),
      );
    });
  });
});
