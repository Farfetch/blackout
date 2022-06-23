import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import { ActionTypes } from '../useUserAuthState';
import {
  AuthenticationTokenManager,
  AxiosAuthenticationTokenManagerOptions,
  client,
  configApiBlackAndWhite,
  TokenData,
  TokenKinds,
} from '@farfetch/blackout-client';
import { DefaultRequestBody, rest } from 'msw';
import { NotLoggedInError, PendingUserOperationError } from '../../errors';
import AuthenticationProvider, {
  CallbackNames,
} from '../../contexts/AuthenticationProvider';
import mswServer from '../../../../tests/mswServer';
import React from 'react';
import useAuthentication from '../useAuthentication';

interface Props {
  children?: React.ReactNode;
  baseURL?: string;
  callbacks?: {
    onUserSessionTerminated: (expiredUserToken: string) => void;
  };
  headers?: { [k: string]: string };
  storage?: AxiosAuthenticationTokenManagerOptions['storage'];
}

const defaultHeaders = {
  'Accept-Language': 'en-GB',
  'FF-Country': 'GB',
  'FF-Currency': 'GBP',
  'x-api-key': '00000000-aaaa-0000-aaaa-000000000000',
};

const loginData = {
  username: '',
  password: '',
  rememberMe: false,
};

const getRenderedHook = (props: Props = {}) => {
  const { baseURL, callbacks, headers, storage } = props;
  return renderHook(() => useAuthentication(), {
    wrapper: ({ children }) => (
      <AuthenticationProvider
        baseURL={baseURL}
        callbacks={callbacks}
        headers={headers}
        storage={storage}
      >
        {children}
      </AuthenticationProvider>
    ),
  });
};

beforeEach(() => jest.useFakeTimers());

afterEach(() => {
  jest.useRealTimers();
  cleanup();
});

describe('useAuthentication', () => {
  it('should return the correct values', async () => {
    const { result } = getRenderedHook();

    await waitFor(() =>
      expect(result.current).toStrictEqual({
        activeTokenData: expect.any(Object),
        clearTokenData: expect.any(Function),
        errorData: expect.any(Object),
        getAccessToken: expect.any(Function),
        getCurrentGuestTokensContext: expect.any(Function),
        isLoading: expect.any(Boolean),
        isLoggedIn: expect.any(Boolean),
        login: expect.any(Function),
        logout: expect.any(Function),
        resetGuestTokensContext: expect.any(Function),
        setGuestTokensContext: expect.any(Function),
        setGuestUserClaims: expect.any(Function),
        tokenManager: expect.any(AuthenticationTokenManager),
      }),
    );
  });

  it("should set the baseURL and headers on the client with the ones provided on the provider's props and load the tokenManagerInstance", async () => {
    const expectedBaseUrl = configApiBlackAndWhite.baseURL;

    const { result } = getRenderedHook({
      baseURL: expectedBaseUrl,
      headers: defaultHeaders,
    });

    const { tokenManager } = result.current;
    expect(client.defaults.baseURL).toBe(expectedBaseUrl);
    expect(client.defaults.headers.common).toBe(defaultHeaders);

    await waitFor(() => expect(tokenManager.isLoaded).toBe(true));
  });

  it('should call the passed in callback functions when the corresponding event happens', async () => {
    const callbacksValue = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      [CallbackNames.OnUserSessionTerminated]: jest.fn(() => {}),
    };

    const { result } = getRenderedHook({
      callbacks: callbacksValue,
    });

    const { tokenManager } = result.current;

    const mockUserTokenData = new TokenData({
      accessToken: 'dummy_access_token',
      expiresIn: '12000',
      refreshToken: 'dummy_refresh_token',
    });

    await act(async () => {
      // Just select the user token provider and force a logout
      await tokenManager.setUserTokenData(mockUserTokenData, true);
      tokenManager.forceLogout();
    });

    expect(
      callbacksValue[CallbackNames.OnUserSessionTerminated],
    ).toHaveBeenCalledWith({
      data: expect.objectContaining(mockUserTokenData),
      kind: TokenKinds.User,
    });
  });

  it('should use the storage passed on the props if defined', async () => {
    const mockStorageOptions = {
      provider: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      serializer: {
        serializeTokenData: data => {
          return JSON.stringify(data);
        },
        deserializeTokenData: () => {
          return new TokenData({});
        },
      },
    };

    const { result } = getRenderedHook({
      storage: mockStorageOptions,
    });

    const { tokenManager } = result.current;

    await waitFor(() =>
      expect(mockStorageOptions.provider.getItem).toHaveBeenCalled(),
    );

    const mockUserTokenData = new TokenData({
      accessToken: 'dummy_access_token',
      expiresIn: '12000',
      refreshToken: 'dummy_refresh_token',
    });

    await act(async () => {
      await tokenManager.setUserTokenData(mockUserTokenData, true);
    });

    expect(mockStorageOptions.provider.setItem).toHaveBeenCalled();

    await act(async () => {
      await tokenManager.clearData();
    });

    expect(mockStorageOptions.provider.removeItem).toHaveBeenCalled();
  });

  it("should update the value of 'isLoggedIn' value whenever user login status changed", async () => {
    const accessToken = 'dummy_access_token';

    mswServer.use(
      rest.post('/authentication/v1/tokens', (_req, res, ctx) => {
        return res(
          ctx.json({
            accessToken,
            expiresIn: '12000',
            refreshToken: 'dummy_refresh_token',
          }),
        );
      }),
      rest.delete(
        `/authentication/v1/tokens/${accessToken}`,
        (_req, res, ctx) => {
          return res(ctx.json({}));
        },
      ),
    );

    const { result } = getRenderedHook();

    expect(result.current.isLoggedIn).toBe(false);

    await act(async () => {
      await result.current.login({
        rememberMe: true,
        username: 'user',
        password: 'pass',
      });
    });

    await waitFor(() => expect(result.current.isLoggedIn).toBe(true));
    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should throw an error if login is called before it is terminated', async () => {
    mswServer.use(
      rest.post('/authentication/v1/tokens', (_req, res, ctx) => {
        return res(
          ctx.json({
            accessToken: 'dummy_access_token',
            expiresIn: '12000',
            refreshToken: 'dummy_refresh_token',
          }),
          ctx.delay(1000),
        );
      }),
    );

    const { result } = getRenderedHook();

    const loginPromise = result.current.login(loginData);

    await waitFor(() => expect(result.current.isLoading).toBe(true));
    await expect(result.current.login(loginData)).rejects.toThrow(
      PendingUserOperationError,
    );

    await loginPromise;

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isLoggedIn).toBe(true);
  });

  it('should set tokens context before fetching the access token', async () => {
    let guestTokenRequestBody: DefaultRequestBody; // Request info for checking later if the endpoint was called with correct data
    mswServer.use(
      rest.post('/authentication/v1/guestTokens', (req, res, ctx) => {
        guestTokenRequestBody = req.body;
        return res(
          ctx.json({
            accessToken: 'dummy_access_token',
            expiresIn: '12000',
          }),
        );
      }),
    );

    const mockGuestUserClaimsParameter = {
      guestUserEmail: 'user@email.com',
      guestUserSecret: 'A1B2C3',
    };

    const { result } = getRenderedHook();

    await waitFor(() => expect(result.current.activeTokenData).toBeTruthy());
    expect(result.current.activeTokenData.kind).toBe(TokenKinds.Guest);

    const getAccessTokenSpy = jest.spyOn(
      result.current.tokenManager,
      'getAccessToken',
    );

    jest.clearAllMocks();

    await act(async () => {
      await result.current.setGuestUserClaims(
        mockGuestUserClaimsParameter,
        false,
      );
    });

    expect(getAccessTokenSpy).toHaveBeenCalledTimes(1);

    expect(guestTokenRequestBody).toEqual({
      ...mockGuestUserClaimsParameter,
      guestUserId: undefined,
    });
  });

  it('should throw an error if logout is called but the current user is not logged in', async () => {
    const { result } = getRenderedHook();

    await waitFor(() => expect(result.current.activeTokenData).toBeTruthy());
    expect(result.current.activeTokenData.kind).toBe(TokenKinds.Guest);

    try {
      await act(async () => {
        await result.current.logout();
      });
    } catch (e) {
      await waitFor(() => {
        expect(result.current.errorData).toBeTruthy();
      });
      expect(e).toBeInstanceOf(NotLoggedInError);
    }

    expect(result.current.errorData).toEqual({
      causeError: expect.any(NotLoggedInError),
      context: ActionTypes.LogoutFailed,
    });

    // Make the login endpoint return invalid data
    // to test when the user token data does not contain
    // an access token case.
    mswServer.use(
      rest.post('/authentication/v1/tokens', (_req, res, ctx) => {
        return res(
          ctx.json({
            accessToken: null,
            expiresIn: '12000',
            refreshToken: 'dummy_refresh_token',
          }),
        );
      }),
    );

    await act(async () => result.current.login(loginData));

    expect(result.current.activeTokenData.kind).toBe(TokenKinds.User);
    expect(result.current.isLoading).toBe(false);

    expect.assertions(14);

    try {
      await act(async () => {
        await result.current.logout();
      });
    } catch (e) {
      await waitFor(() => {
        expect(result.current.errorData).toBeTruthy();
      });
      expect(e).toBeInstanceOf(NotLoggedInError);
    }

    expect(result.current.errorData).toEqual({
      causeError: expect.any(NotLoggedInError),
      context: ActionTypes.LogoutFailed,
    });
  });

  it("should _NOT_ throw an error if logout request fails but the error is of the kind 'user token is not found'", async () => {
    const accessToken = 'dummy_access_token';

    mswServer.use(
      rest.post('/authentication/v1/tokens', (_req, res, ctx) => {
        return res(
          ctx.json({
            accessToken,
            expiresIn: '12000',
            refreshToken: 'dummy_refresh_token',
          }),
        );
      }),
      rest.delete(
        `/authentication/v1/tokens/${accessToken}`,
        (_req, res, ctx) => {
          return res.once(ctx.json({ errors: [{ code: '17' }] }));
        },
      ),
    );

    const { result } = getRenderedHook();

    await waitFor(() => expect(result.current.activeTokenData).toBeTruthy());
    expect(result.current.activeTokenData.kind).toBe(TokenKinds.Guest);

    expect.assertions(14);

    await act(async () => result.current.login(loginData));

    expect(result.current.activeTokenData.kind).toBe(TokenKinds.User);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isLoggedIn).toBe(true);

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.errorData).toBeNull();
    expect(result.current.isLoggedIn).toBe(false);

    await act(async () => result.current.login(loginData));

    expect(result.current.activeTokenData.kind).toBe(TokenKinds.User);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isLoggedIn).toBe(true);

    // Mock a new response for the delete request
    mswServer.use(
      rest.delete(
        `/authentication/v1/tokens/${accessToken}`,
        (_req, res, ctx) => {
          return res(ctx.json({ status: 404 }));
        },
      ),
    );

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.errorData).toBeNull();
    expect(result.current.isLoggedIn).toBe(false);
  });

  it("should throw an error if logout fails for other reason than 'user token is not found'", async () => {
    const errorResponseStatus = 500;
    const accessToken = 'dummy_access_token';

    mswServer.use(
      rest.post('/authentication/v1/tokens', (_req, res, ctx) => {
        return res(
          ctx.json({
            accessToken,
            expiresIn: '12000',
            refreshToken: 'dummy_refresh_token',
          }),
        );
      }),
      rest.delete(
        `/authentication/v1/tokens/${accessToken}`,
        (_req, res, ctx) => {
          return res(ctx.status(errorResponseStatus));
        },
      ),
    );

    const { result } = getRenderedHook();

    await act(async () => result.current.login(loginData));

    expect(result.current.activeTokenData.kind).toBe(TokenKinds.User);
    expect(result.current.isLoading).toBe(false);

    const mockError = new Error(
      `Request failed with status code ${errorResponseStatus}`,
    );

    expect.assertions(6);

    try {
      await act(async () => {
        await result.current.logout();
      });
    } catch (e) {
      await waitFor(() => {
        expect(result.current.errorData).toBeTruthy();
      });
      expect(e).toStrictEqual(mockError);
    }

    expect(result.current.errorData).toEqual({
      causeError: mockError,
      context: ActionTypes.LogoutFailed,
    });
  });
});
