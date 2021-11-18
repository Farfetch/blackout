import { act, renderHook } from '@testing-library/react-hooks';
import { ActionTypes } from '../useUserAuthState';
import { cleanup } from '@testing-library/react';
import {
  deleteTokens,
  postGuestTokens,
  postTokens,
} from '@farfetch/blackout-core/authentication/client';
import {
  LoginWithoutDataError,
  NotLoggedInError,
  PendingUserOperationError,
} from '../../errors';
import AuthenticationProvider, {
  CallbackNames,
} from '../../contexts/AuthenticationProvider';
import AxiosAuthenticationTokenManager, {
  TokenData,
  TokenKinds,
} from '@farfetch/blackout-core/helpers/client/interceptors/authentication';
import client, {
  configApiBlackAndWhite,
} from '@farfetch/blackout-core/helpers/client';
import React from 'react';
import useAuthentication from '../useAuthentication';

const mockUserTokenData = {
  accessToken: 'dummy_access_token',
  refreshToken: 'dummy_refresh_token',
  expiresIn: '12000',
};

const mockGuestUserTokenData = {
  accessToken: 'dummy_access_token',
  expiresIn: '12000',
};

jest.mock('@farfetch/blackout-core/authentication/client', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-core/authentication/client'),
    postGuestTokens: jest.fn(() => Promise.resolve(mockGuestUserTokenData)),
    postTokens: jest.fn(() => Promise.resolve(mockUserTokenData)),
    deleteTokens: jest.fn(() => Promise.resolve(true)),
  };
});

const defaultHeaders = {
  'Accept-Language': 'en-GB',
  'FF-Country': 'GB',
  'FF-Currency': 'GBP',
  'x-api-key': '00000000-aaaa-0000-aaaa-000000000000',
};

const wrapper = ({ children, baseURL, callbacks, headers, storage }) => (
  <AuthenticationProvider
    baseURL={baseURL}
    callbacks={callbacks}
    headers={headers}
    storage={storage}
  >
    {children}
  </AuthenticationProvider>
);

jest.useFakeTimers();

afterEach(cleanup);

describe('useUserAuthState', () => {
  it('should return the correct values', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useAuthentication(),
      {
        wrapper,
      },
    );

    await waitForNextUpdate();

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
      setGuestUserClaims: expect.any(Function),
      setGuestTokensContext: expect.any(Function),

      tokenManager: expect.any(AxiosAuthenticationTokenManager),
    });
  });

  it("should set the baseURL and headers on the client with the ones provided on the provider's props and load the tokenManagerInstance", async () => {
    const expectedBaseUrl = configApiBlackAndWhite.baseURL;

    const { result, waitForNextUpdate } = renderHook(
      () => useAuthentication(),
      {
        wrapper,
        initialProps: {
          baseURL: expectedBaseUrl,
          headers: defaultHeaders,
        },
      },
    );

    const { tokenManager } = result.current;

    expect(client.defaults.baseURL).toBe(expectedBaseUrl);
    expect(client.defaults.headers.common).toBe(defaultHeaders);

    await waitForNextUpdate();

    expect(tokenManager.isLoaded).toBe(true);
  });

  it('should call the passed in callback functions when the corresponding event happens', async () => {
    const callbacksValue = {
      [CallbackNames.OnUserSessionTerminated]: jest.fn(() => {}),
    };

    const { result, waitForNextUpdate } = renderHook(
      () => useAuthentication(),
      {
        wrapper,
        initialProps: {
          callbacks: callbacksValue,
        },
      },
    );

    await waitForNextUpdate();

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

    const { result, waitForNextUpdate } = renderHook(
      () => useAuthentication(),
      {
        wrapper,
        initialProps: {
          storage: mockStorageOptions,
        },
      },
    );

    await waitForNextUpdate();

    const { tokenManager } = result.current;

    expect(mockStorageOptions.provider.getItem).toHaveBeenCalled();

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
    const { result, waitForNextUpdate } = renderHook(
      () => useAuthentication(),
      {
        wrapper,
      },
    );

    await waitForNextUpdate();

    expect(result.current.isLoggedIn).toBe(false);

    await act(async () => {
      await result.current.login({
        rememberMe: false,
        username: 'user',
        password: 'pass',
      });
    });

    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should throw an error if login is called before it is terminated', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useAuthentication(),
      {
        wrapper,
      },
    );

    postTokens.mockImplementationOnce(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockUserTokenData);
        }, 10000);
      });
    });

    await waitForNextUpdate();

    const loginPromise = act(() => {
      return result.current.login({});
    });

    expect(result.current.isLoading).toBe(true);

    expect(result.current.login({})).rejects.toThrow(PendingUserOperationError);

    jest.runTimersToTime();

    await loginPromise;

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isLoggedIn).toBe(true);
  });

  it('should throw an error if login is called with no data', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useAuthentication(),
      {
        wrapper,
      },
    );

    await waitForNextUpdate();

    expect.assertions(2);

    try {
      await act(() => result.current.login());
    } catch (e) {
      expect(e).toBeInstanceOf(LoginWithoutDataError);
    }

    expect(result.current.errorData).toEqual({
      causeError: expect.any(LoginWithoutDataError),
      context: ActionTypes.LoginFailed,
    });
  });

  it('should set tokens context before fetching the access token', async () => {
    const mockGuestUserEmail = 'user@email.com';
    const mockGuestUserSecretCode = 'A1B2C3';
    const { result, waitForNextUpdate } = renderHook(
      () => useAuthentication(),
      {
        wrapper,
      },
    );

    await waitForNextUpdate();

    expect(result.current.activeTokenData).toBeTruthy();
    expect(result.current.activeTokenData.kind).toBe(TokenKinds.Guest);

    await act(async () => {
      await result.current.setGuestUserClaims({
        guestUserEmail: mockGuestUserEmail,
        guestUserSecret: mockGuestUserSecretCode,
      });
    });

    expect(postGuestTokens).toBeCalledWith(
      {
        guestUserEmail: 'user@email.com',
        guestUserId: null,
        guestUserSecret: 'A1B2C3',
      },
      { __isGuestUserAccessTokenRequest: true, __noAuthentication: true },
    );
  });

  it('should throw an error if logout is called but the current user is not logged in', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useAuthentication(),
      {
        wrapper,
      },
    );

    await waitForNextUpdate();

    expect(result.current.activeTokenData).toBeTruthy();
    expect(result.current.activeTokenData.kind).toBe(TokenKinds.Guest);

    expect.assertions(8);

    try {
      await act(async () => {
        await result.current.logout();
      });
    } catch (e) {
      expect(e).toBeInstanceOf(NotLoggedInError);
    }

    expect(result.current.errorData).toEqual({
      causeError: expect.any(NotLoggedInError),
      context: ActionTypes.LogoutFailed,
    });

    // Make the login endpoint return invalid data
    // to test when the user token data does not contain
    // an access token case.
    postTokens.mockImplementationOnce(() => ({
      ...mockUserTokenData,
      accessToken: null,
    }));

    await act(async () => result.current.login({}));

    expect(result.current.activeTokenData.kind).toBe(TokenKinds.User);
    expect(result.current.isLoading).toBe(false);

    try {
      await act(async () => {
        await result.current.logout();
      });
    } catch (e) {
      expect(e).toBeInstanceOf(NotLoggedInError);
    }

    expect(result.current.errorData).toEqual({
      causeError: expect.any(NotLoggedInError),
      context: ActionTypes.LogoutFailed,
    });
  });

  it("should _NOT_ throw an error if logout request fails but the error is of the kind 'user token is not found'", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useAuthentication(),
      {
        wrapper,
      },
    );

    await waitForNextUpdate();

    expect(result.current.activeTokenData).toBeTruthy();
    expect(result.current.activeTokenData.kind).toBe(TokenKinds.Guest);

    expect.assertions(12);

    await act(async () => result.current.login({}));

    expect(result.current.activeTokenData.kind).toBe(TokenKinds.User);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isLoggedIn).toBe(true);

    deleteTokens.mockImplementationOnce(() =>
      Promise.reject({
        status: 400,
        code: '17',
      }),
    );

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.errorData).toBeNull();
    expect(result.current.isLoggedIn).toBe(false);

    await act(async () => result.current.login({}));

    expect(result.current.activeTokenData.kind).toBe(TokenKinds.User);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isLoggedIn).toBe(true);

    deleteTokens.mockImplementationOnce(() =>
      Promise.reject({
        status: 404,
      }),
    );

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.errorData).toBeNull();
    expect(result.current.isLoggedIn).toBe(false);
  });

  it("should throw an error if logout fails for other reason than 'user token is not found'", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useAuthentication(),
      {
        wrapper,
      },
    );

    await waitForNextUpdate();

    expect.assertions(4);

    await act(async () => result.current.login({}));

    expect(result.current.activeTokenData.kind).toBe(TokenKinds.User);
    expect(result.current.isLoading).toBe(false);

    const mockError = new Error('mock error');

    deleteTokens.mockImplementationOnce(() => {
      throw mockError;
    });

    try {
      await act(async () => {
        await result.current.logout();
      });
    } catch (e) {
      expect(e).toBe(mockError);
    }

    expect(result.current.errorData).toEqual({
      causeError: mockError,
      context: ActionTypes.LogoutFailed,
    });
  });
});
