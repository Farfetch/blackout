import { AuthenticationTokenManager } from '..';
import {
  defaultAuthorizationHeaderFormatter,
  getDefaultTokenDataSerializer,
} from '../defaults';
import { getUser } from '../../../../../users';
import { DEFAULT_STORAGE_KEY as GuestTokenDefaultStorageKey } from '../token-providers/GuestTokenProvider';
import {
  MisconfiguredTokenProviderError,
  RefreshGuestUserAccessTokenError,
  RefreshUserAccessTokenError,
  TokenManagerNotLoadedException,
  UserSessionExpiredError,
} from '../errors';
import { postGuestToken } from '../../../../../users/authentication';
import { postTrackings } from '../../../../../omnitracking';
import { rest } from 'msw';
import { DEFAULT_STORAGE_KEY as UserTokenDefaultStorageKey } from '../token-providers/UserTokenProvider';
import AuthenticationConfigOptions from '../AuthenticationConfigOptions';
import client from '../../..';
import mswServer from '../../../../../../tests/mswServer';
import TokenData from '../token-providers/TokenData';
import TokenKinds from '../token-providers/TokenKinds';
import type {
  AxiosAuthenticationTokenManagerOptions,
  UserParams,
} from '../types/TokenManagerOptions.types';
import type { ITokenData } from '../token-providers/types/TokenData.types';
import type { RequestConfig } from '../types/AuthenticationTokenManager.types';
import type { TokenContext } from '../token-providers/types/TokenContext.types';

jest.useFakeTimers();

const mockGuestTokenRequester = jest.fn(
  (data: TokenContext, config?: RequestConfig) => {
    return new Promise<ITokenData>((resolve, reject) => {
      resolve({
        accessToken: 'dummy_access_token',
        expiresIn: '12000',
      });
      reject({
        config,
        response: { status: 500 },
        request: { data },
        isAxiosError: true,
      });
    });
  },
);

const mockUserTokenRequester = jest.fn(
  (data: UserParams, config?: RequestConfig) => {
    return new Promise<ITokenData>((resolve, reject) => {
      resolve({
        accessToken: 'dummy_access_token',
        expiresIn: '12000',
        refreshToken: 'dummy_refresh_token',
      });
      reject({
        config,
        response: { status: 500 },
        request: { data },
        isAxiosError: true,
      });
    });
  },
);

const defaultOptions: AxiosAuthenticationTokenManagerOptions = {
  authorizationHeaderFormatter: defaultAuthorizationHeaderFormatter,
  guestTokenRequester: mockGuestTokenRequester,
  userTokenRequester: mockUserTokenRequester,
  refreshTokenWindowOffset: 0,
};

describe('AuthenticationTokenManager', () => {
  let tokenManagerInstance: any;

  function createAndSetTokenManagerInstance(
    axiosInstance = client,
    options = defaultOptions,
  ) {
    if (tokenManagerInstance) {
      tokenManagerInstance.ejectInterceptors();
    }

    tokenManagerInstance = new AuthenticationTokenManager(
      axiosInstance,
      options,
    );
    return tokenManagerInstance;
  }

  beforeEach(async () => {
    jest.clearAllMocks();

    tokenManagerInstance = createAndSetTokenManagerInstance(client);

    await tokenManagerInstance.load();
  });

  afterEach(function () {
    if (tokenManagerInstance) {
      tokenManagerInstance.ejectInterceptors();
    }
  });

  describe('Flows', () => {
    describe('Guest flow', () => {
      it('should create new guest tokens when there are no tokens and a request that needs authentication is made', async () => {
        mswServer.use(
          rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
            res(ctx.status(200), ctx.json({ id: 10000, isGuest: true })),
          ),
        );

        await getUser();

        expect(mockGuestTokenRequester).toHaveBeenCalledWith(
          { guestUserId: undefined },
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

        mswServer.use(
          rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
            res(ctx.status(200), ctx.json({ id: mockUserId, isGuest: true })),
          ),
        );

        mockGuestTokenRequester.mockImplementationOnce(() => {
          return Promise.resolve({
            accessToken: 'dummy_access_token',
            expiresIn: '0', // The token returned expires immediatelly,
            userId: mockUserId, // The post guest tokens request does not currently returns a userId yet, so we fake it does here.
          });
        });

        await getUser();

        expect(mockGuestTokenRequester).toHaveBeenCalledWith(
          { guestUserId: undefined },
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
        mswServer.use(
          rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
            res(ctx.status(200), ctx.json({ id: 10000, isGuest: true })),
          ),
        );

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let mockGuestTokenRequesterPromiseResolve = (value: ITokenData) =>
          undefined;

        const mockGuestTokenRequesterPromise = new Promise<ITokenData>(
          (resolve: any) => {
            mockGuestTokenRequesterPromiseResolve = resolve;
          },
        );

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
        mswServer.use(
          rest.post('/api/authentication/v1/guestTokens', (_req, res, ctx) =>
            res(
              ctx.status(200),
              ctx.json({
                accessToken: 'dummy_access_token',
                expiresIn: '12000',
              }),
            ),
          ),
        );

        await postGuestToken(
          { guestUserId: 0, guestUserEmail: '', guestUserSecret: '' },
          {
            baseURL: '/api',
            [AuthenticationConfigOptions.NoAuthentication]: true,
          },
        );

        expect(mockGuestTokenRequester).not.toHaveBeenCalled();
      });

      it('should create a new guest token when a request fails with 401 and retry the request with the new token', async () => {
        mswServer.use(
          rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
            res.once(ctx.status(401)),
          ),
          rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
            res(ctx.status(200), ctx.json({ id: 10000, isGuest: true })),
          ),
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
        mswServer.use(
          rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
            res.once(ctx.status(401)),
          ),
          rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
            res(ctx.status(500)),
          ),
        );

        expect.assertions(3);

        try {
          await getUser();
        } catch (e: any) {
          expect(e).toBeInstanceOf(Error);
          expect(e.response.status).toBe(500);
        }

        expect(mockGuestTokenRequester).toHaveBeenCalledTimes(2);
      });

      it('should return an error if a request fails with 401 and the access token refresh fails', async () => {
        mswServer.use(
          rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
            res(ctx.status(401)),
          ),
        );

        mockGuestTokenRequester.mockImplementationOnce(() => {
          return Promise.resolve({
            accessToken: 'dummy_access_token',
            expiresIn: '12000',
          });
        });

        mockGuestTokenRequester.mockImplementationOnce(
          (data: TokenContext, config?: RequestConfig) => {
            return Promise.reject({
              config,
              response: { status: 500 },
              request: { data },
              isAxiosError: true,
            });
          },
        );

        expect.assertions(2);

        try {
          await getUser();
        } catch (e) {
          expect(e).toBeInstanceOf(RefreshGuestUserAccessTokenError);
        }

        expect(mockGuestTokenRequester).toHaveBeenCalledTimes(2);
      });

      it('should refresh guest token data when the get profile request fails because the guest user has expired', async () => {
        // Set initial users/me request mock to return a successful result
        // so that guest token data is set.
        mswServer.use(
          rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
            res.once(ctx.status(200), ctx.json({ id: 10000, isGuest: true })),
          ),
        );

        // Before any requests it should be null as it is not loading from storage.
        expect(tokenManagerInstance.guestTokenProvider.getTokenData()).toBe(
          null,
        );

        // Force a get profile request so that the guest token data is set with
        // a user id.
        await getUser({
          [AuthenticationConfigOptions.IsGetUserProfileRequest]: true,
        });

        // Expect that the post guestTokens request was performed with a null
        // guestUserId as it is the first request.
        expect(mockGuestTokenRequester).toHaveBeenLastCalledWith(
          expect.objectContaining({ guestUserId: undefined }),
          expect.any(Object),
        );

        const guestTokenData =
          tokenManagerInstance.guestTokenProvider.getTokenData();

        expect(guestTokenData).toEqual(
          expect.objectContaining({
            userId: 10000,
          }),
        );

        mswServer.use(
          rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
            res.once(ctx.status(400)),
          ),
          rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
            res(ctx.status(200), ctx.json({ id: 20000, isGuest: true })),
          ),
        );

        // Clear mock data from mockGuestTokenRequester mock
        jest.clearAllMocks();

        // Force guest user token expiration.
        // This is necessary so that a request to guestTokens is made
        // with the guestUserId filled with the current guest token user id
        // so that we can assert it.
        guestTokenData.expiresTimeUtc = new Date().getTime();

        // Perform the users/me request. It should not throw and should retry the request
        // after getting the first 400 response.
        await getUser({
          [AuthenticationConfigOptions.IsGetUserProfileRequest]: true,
        });

        // Expect that the post guestTokens request was performed first with the
        // current guest user id, and then with null
        expect(mockGuestTokenRequester).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({ guestUserId: 10000 }),
          expect.any(Object),
        );

        expect(mockGuestTokenRequester).toHaveBeenNthCalledWith(
          2,
          expect.objectContaining({ guestUserId: undefined }),
          expect.any(Object),
        );

        expect(tokenManagerInstance.guestTokenProvider.getTokenData()).toEqual(
          expect.objectContaining({ userId: 20000 }),
        );
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

        mswServer.use(
          rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
            res(ctx.status(200), ctx.json({ id: 10000, isGuest: false })),
          ),
        );

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

        mswServer.use(
          rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
            res(ctx.status(200), ctx.json({ id: 10000, isGuest: false })),
          ),
        );

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let mockUserTokenRequesterPromiseResolve = (value: ITokenData) =>
          undefined;

        const mockUserTokenRequesterPromise = new Promise<ITokenData>(
          (resolve: any) => {
            mockUserTokenRequesterPromiseResolve = resolve;
          },
        );

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
        mswServer.use(
          rest.post('/api/marketing/v1/trackings', (_req, res, ctx) =>
            res.once(ctx.status(401)),
          ),
          rest.post('/api/marketing/v1/trackings', (_req, res, ctx) =>
            res(ctx.status(200), ctx.json({})),
          ),
        );

        // We use postTrackings client here to test for other method of requests instead of only GETs.
        await postTrackings({});

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
        mockUserTokenRequester.mockImplementationOnce(
          (data: any, config: any) => {
            return Promise.reject({
              config,
              response: { status: 401 },
              request: { data },
              isAxiosError: true,
            });
          },
        );

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
        mockUserTokenRequester.mockImplementationOnce(
          (data: any, config: any) => {
            return Promise.reject({
              config,
              response: { status: 500 },
              request: { data },
              isAxiosError: true,
            });
          },
        );

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
        mswServer.use(
          rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
            res.once(ctx.status(401)),
          ),
          rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
            res(ctx.status(500)),
          ),
        );

        expect.assertions(4);

        try {
          await getUser();
        } catch (e: any) {
          expect(e).toBeInstanceOf(Error);
          expect(e.response.status).toBe(500);
        }

        expect(mockUserTokenRequester).toHaveBeenCalledTimes(1);
      });

      it('should return an error if a request fails with 401 and the access token refresh fails', async () => {
        mswServer.use(
          rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
            res(ctx.status(401)),
          ),
        );

        mockUserTokenRequester.mockImplementationOnce(
          (data: any, config: any) => {
            return Promise.reject({
              config,
              response: { status: 500 },
              request: { data },
              isAxiosError: true,
            });
          },
        );

        expect.assertions(3);

        try {
          await getUser();
        } catch (e) {
          expect(e).toBeInstanceOf(RefreshUserAccessTokenError);
        }

        expect(mockUserTokenRequester).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Load', () => {
    it('should throw an error if a request is performed before token manager is loaded', () => {
      tokenManagerInstance = createAndSetTokenManagerInstance(client);

      expect.assertions(2);

      expect(tokenManagerInstance.isLoaded).toBeFalsy();

      expect(getUser()).rejects.toThrow(TokenManagerNotLoadedException);
    });

    it('should wait for the load promise completion when a request is performed while token manager is loading', async () => {
      const mockGetUserResponse = {
        id: 10000,
        isGuest: false,
      };

      const loadAfterTimeoutPromise = new Promise<string | null>(resolve =>
        setTimeout(() => resolve('dummy_access_token'), 2000),
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
            serializeTokenData: (data: any) => {
              return data;
            },
            deserializeTokenData: (data: any) => {
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

      mswServer.use(
        rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
          res(ctx.status(200), ctx.json(mockGetUserResponse)),
        ),
      );

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
      it.each([
        'authorizationHeaderFormatter',
        'guestTokenRequester',
        'userTokenRequester',
      ])(
        "should throw an error if there are no value for option '%s'",
        (option: any) => {
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

      const mockGetItem = jest.fn(
        () =>
          new Promise<string>(resolve => {
            resolve(
              tokenDataSerializer.serializeTokenData({
                accessToken: 'dummy_access_token',
                refreshToken: 'dummy_refresh_token',
                expiresIn: '12000',
                expiresTimeUtc: new Date().getTime() + 12000000,
                userId: 10000,
              }),
            );
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
              provider: { ...optionsWithValidStorageProvider.storage.provider },
              serializer: getDefaultTokenDataSerializer('secret_key'),
            },
          };

          tokenManagerInstance = createAndSetTokenManagerInstance(
            client,
            finalOptions,
          );
        }).not.toThrow();
      });

      it("should validate if a valid 'storage.serializer' option value was specified", () => {
        // Remove previously installed interceptors
        expect(() => {
          const finalOptions = {
            ...optionsWithValidStorageProvider,
            storage: {
              ...optionsWithValidStorageProvider.storage,
              serializer: {
                serializeTokenData: () => '',
                deserializeTokenData: () => ({}),
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

      it("should call 'storage.provider.removeItem' if '.clearData()' is called on 'AuthenticationTokenManager' instance", async () => {
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

      mswServer.use(
        rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
          res(ctx.status(200), ctx.json(mockGetUserResponse)),
        ),
      );

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

      mswServer.use(
        rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
          res(ctx.status(200), ctx.json(mockGetUserResponse)),
        ),
      );

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

      mswServer.use(
        rest.get('/api/account/v1/users/me', (_req, res, ctx) =>
          res(ctx.status(200), ctx.json({})),
        ),
      );

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
