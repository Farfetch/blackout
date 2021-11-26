import { act, renderHook } from '@testing-library/react-hooks';
import { cleanup } from '@testing-library/react';
import { getProfile } from '@farfetch/blackout-client/profile/client';
import { mockDefaultActiveTokenData } from '../../contexts/__fixtures__/AuthenticationProvider.fixtures';
import { ProfileChangedError } from '../../errors';
import AuthenticationProvider from '../../contexts/AuthenticationProvider';
import React from 'react';
import UserProfileProvider from '../../contexts/UserProfileProvider';
import useUserProfile from '../useUserProfile';

const mockUserProfileData = {
  id: mockDefaultActiveTokenData.data.userId,
};

let mockGetProfileCommon;

jest.mock('../../contexts/AuthenticationProvider');

jest.mock('@farfetch/blackout-client/profile/client', () => {
  if (!mockGetProfileCommon) {
    mockGetProfileCommon = config => {
      const usedAccessTokenCallback = config['__usedAccessTokenCallback'];

      if (usedAccessTokenCallback) {
        usedAccessTokenCallback(mockDefaultActiveTokenData.data.accessToken);
      }

      return Promise.resolve(mockUserProfileData);
    };
  }

  return {
    ...jest.requireActual('@farfetch/blackout-client/profile/client'),
    getProfile: jest.fn(mockGetProfileCommon),
  };
});

const wrapper = ({
  children,
  baseURL,
  callbacks,
  headers,
  storage,
  fetchProfileOnTokenChanges,
}) => (
  <AuthenticationProvider
    baseURL={baseURL}
    callbacks={callbacks}
    headers={headers}
    storage={storage}
  >
    <UserProfileProvider
      fetchProfileOnTokenChanges={fetchProfileOnTokenChanges}
    >
      {children}
    </UserProfileProvider>
  </AuthenticationProvider>
);

afterEach(cleanup);

jest.useFakeTimers();

describe('useUserProfile', () => {
  it('should return the correct values', async () => {
    const { result } = renderHook(() => useUserProfile(), {
      wrapper,
      initialProps: {
        fetchProfileOnTokenChanges: false,
      },
    });

    expect(result.current).toStrictEqual({
      error: expect.any(Object),
      isLoading: expect.any(Boolean),
      loadProfile: expect.any(Function),
      userData: expect.any(Object),
    });
  });

  it('should _NOT_ call getProfile again if there is a pending loadProfile operation and another call to loadProfile is made again', async () => {
    getProfile.mockImplementationOnce(config => {
      return new Promise(resolve => {
        setTimeout(() => {
          mockGetProfileCommon(config).then(data => resolve(data));
        }, 10000);
      });
    });

    const { result } = renderHook(() => useUserProfile(), {
      wrapper,
      initialProps: {
        fetchProfileOnTokenChanges: true,
      },
    });

    // As fetchProfileOnTokenChanges = true, the hook when first rendered will proceed to call loadProfile
    // in a useEffect because the initial userData state is different
    // from the user on the current active token data.
    expect(result.current.isLoading).toBe(true);

    // Call the loadProfile function directly to simulate a second call
    // from the user while the previous loadProfile call has not finished.
    const loadProfilePromise = result.current.loadProfile();

    jest.runTimersToTime();

    await act(async () => await loadProfilePromise);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.userData).toBe(mockUserProfileData);

    expect(getProfile).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if getProfile fails', async () => {
    const expectedError = new Error('dummy error');

    getProfile.mockImplementationOnce(config => {
      return mockGetProfileCommon(config).then(() => {
        throw expectedError;
      });
    });

    const { result } = renderHook(() => useUserProfile(), {
      wrapper,
      initialProps: {
        fetchProfileOnTokenChanges: false,
      },
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();

    expect.assertions(5);

    try {
      await act(() => {
        return result.current.loadProfile();
      });
    } catch (e) {
      expect(e).toBe(expectedError);
    }

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(expectedError);
  });

  it('should throw a profile changed error if when the getProfile request returns, the current active access token has changed', async () => {
    getProfile.mockImplementationOnce(config => {
      const usedAccessTokenCallback = config['__usedAccessTokenCallback'];

      if (usedAccessTokenCallback) {
        usedAccessTokenCallback('another_token');
      }

      return Promise.resolve(mockUserProfileData);
    });

    const { result } = renderHook(() => useUserProfile(), {
      wrapper,
      initialProps: {
        fetchProfileOnTokenChanges: false,
      },
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();

    expect.assertions(5);

    try {
      await act(() => {
        return result.current.loadProfile();
      });
    } catch (e) {
      expect(e).toBeInstanceOf(ProfileChangedError);
    }

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeInstanceOf(ProfileChangedError);
  });
});
