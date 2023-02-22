import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import {
  type AxiosAuthenticationTokenManagerOptions,
  defaultAuthorizationHeaderFormatter,
  getUser,
  postGuestToken,
  postToken,
  type UserToken,
} from '@farfetch/blackout-client';
import { mockDefaultActiveTokenData } from '../../contexts/__fixtures__/AuthenticationProvider.fixtures';
import { ProfileChangedError } from '../../errors';
import AuthenticationProvider from '../../contexts/AuthenticationProvider';
import React from 'react';
import UserProfileProvider from '../../contexts/UserProfileProvider';
import useUserProfile from '../useUserProfile';

interface Props {
  children?: React.ReactNode;
  baseURL?: string;
  callbacks?: {
    onUserSessionTerminated: (expiredUserToken: UserToken | null) => void;
  };
  headers?: { [k: string]: string };
  fetchProfileOnTokenChanges?: boolean;
  storage?: AxiosAuthenticationTokenManagerOptions['storage'];
}

const mockUserData = {
  id: mockDefaultActiveTokenData.data.userId,
};

jest.mock('../../contexts/AuthenticationProvider');

jest.mock('@farfetch/blackout-client', () => {
  return {
    ...jest.requireActual<object>('@farfetch/blackout-client'),
    getUser: jest.fn(config => {
      const usedAccessTokenCallback = config['__usedAccessTokenCallback'];

      if (usedAccessTokenCallback) {
        usedAccessTokenCallback(mockDefaultActiveTokenData.data.accessToken);
      }

      return Promise.resolve(mockUserData);
    }),
  };
});

const getRenderedHook = ({
  baseURL,
  callbacks,
  headers,
  storage,
  fetchProfileOnTokenChanges,
}: Props) => {
  return renderHook(() => useUserProfile(), {
    wrapper: ({ children }) => (
      <AuthenticationProvider
        baseURL={baseURL!}
        callbacks={callbacks!}
        headers={headers!}
        storage={storage}
        authorizationHeaderFormatter={defaultAuthorizationHeaderFormatter}
        guestTokenRequester={postGuestToken}
        userTokenRequester={postToken}
        refreshTokenWindowOffset={30}
      >
        <UserProfileProvider
          fetchProfileOnTokenChanges={fetchProfileOnTokenChanges!}
          onProfileChange={jest.fn()}
        >
          {children}
        </UserProfileProvider>
      </AuthenticationProvider>
    ),
  });
};

afterEach(cleanup);

jest.useFakeTimers();

describe('useUserProfile', () => {
  it('should return the correct values', async () => {
    const { result } = getRenderedHook({
      fetchProfileOnTokenChanges: false,
    });

    await waitFor(() =>
      expect(result.current).toStrictEqual({
        error: expect.any(Object),
        isLoading: expect.any(Boolean),
        loadProfile: expect.any(Function),
        userData: expect.any(Object),
      }),
    );
  });

  it('should _NOT_ call getUser again if there is a pending loadProfile operation and another call to loadProfile is made again', async () => {
    (getUser as jest.Mock).mockImplementationOnce(config => {
      return new Promise(resolve => {
        setTimeout(() => {
          const usedAccessTokenCallback = config['__usedAccessTokenCallback'];

          if (usedAccessTokenCallback) {
            usedAccessTokenCallback(
              mockDefaultActiveTokenData.data.accessToken,
            );
          }

          return resolve(mockUserData);
        }, 10000);
      });
    });

    const { result } = getRenderedHook({
      fetchProfileOnTokenChanges: true,
    });

    // As fetchProfileOnTokenChanges = true, the hook when first rendered will proceed to call loadProfile
    // in a useEffect because the initial userData state is different
    // from the user on the current active token data.
    await waitFor(() => expect(result.current.isLoading).toBe(true));

    // Call the loadProfile function directly to simulate a second call
    // from the user while the previous loadProfile call has not finished.
    const loadProfilePromise = result.current.loadProfile();

    jest.runAllTimers();

    await act(async () => {
      await loadProfilePromise;
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.userData).toBe(mockUserData);

    expect(getUser).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if getUser fails', async () => {
    const expectedError = new Error('dummy error');

    (getUser as jest.Mock).mockImplementationOnce(() => {
      return Promise.reject(expectedError);
    });

    const { result } = getRenderedHook({
      fetchProfileOnTokenChanges: false,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).toBeNull();

    await expect(
      async () =>
        await act(async () => {
          await result.current.loadProfile();
        }),
    ).rejects.toThrow(expectedError);

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(expectedError);
  });

  it('should throw a profile changed error if when the getUser request returns, the current active access token has changed', async () => {
    (getUser as jest.Mock).mockImplementationOnce(config => {
      const usedAccessTokenCallback = config['__usedAccessTokenCallback'];

      if (usedAccessTokenCallback) {
        usedAccessTokenCallback('another_token');
      }

      return Promise.resolve(mockUserData);
    });

    const { result } = getRenderedHook({
      fetchProfileOnTokenChanges: false,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).toBeNull();

    await expect(
      async () =>
        await act(async () => {
          await result.current.loadProfile();
        }),
    ).rejects.toThrow(ProfileChangedError);

    await waitFor(() => expect(result.current.error).toBeTruthy());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeInstanceOf(ProfileChangedError);
  });
});
