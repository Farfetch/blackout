import {
  AuthenticationConfigOptions,
  getUser,
  GuestUserNormalized,
  User,
} from '@farfetch/blackout-client';
import { ProfileChangedError } from '../errors';
import noop from 'lodash/noop';
import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import useAuthentication from '../hooks/useAuthentication';
import UserProfileContext from './UserProfileContext';

interface Props {
  children: React.ReactNode;
  fetchProfileOnTokenChanges: boolean;
  onProfileChange: (response: User | GuestUserNormalized) => void;
}

interface State {
  isLoading: boolean;
  error: Error | null;
  userData: User | GuestUserNormalized | null;
}

interface Action {
  type: string;
  payload?: User | GuestUserNormalized | Error;
}

export interface Error {
  code: number;
  message: string;
  status: number;
}

const ActionTypes = {
  GetUserRequested: 'FETCH_USER_REQUESTED',
  GetUserSucceeded: 'FETCH_USER_SUCCEEDED',
  GetUserFailed: 'FETCH_USER_FAILED',
};

const initialState: State = {
  isLoading: false,
  error: null,
  userData: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.GetUserRequested: {
      return {
        ...state,
        error: null,
        isLoading: true,
        userData: null,
      };
    }

    case ActionTypes.GetUserSucceeded: {
      return {
        ...state,
        isLoading: false,
        userData: action.payload as User | GuestUserNormalized,
      };
    }

    case ActionTypes.GetUserFailed: {
      return {
        ...state,
        error: action.payload as Error,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

/**
 * Provides user profile state and a function to load it. Optionally, it can keep
 * the user profile data in sync with access token changes. The user profile state
 * data and loadProfile function will be accessible through the useUserProfile
 * hook. This provider depends on the AuthenticationProvider to work.
 *
 * @example <caption>Adding the UserProfileProvider to your app</caption>
 * ```
 *
 * import \{ AuthenticationProvider, UserProfileProvider \} from '\@farfetch/blackout-react/authentication/contexts';
 * import \{ useUserProfile \} from '\@farfetch/blackout-react/authentication/hooks';
 *
 * const App = () =\> \{
 * return (<AuthenticationProvider><UserProfileProvider><MyComponent /></UserProfileProvider></AuthenticationProvider>);
 * \}
 *
 * ```
 *
 * @param props - Props for the provider.
 *
 * @returns An element that wraps the children with the UserProfileContext.Provider element.
 */
const UserProfileProvider = ({
  children,
  fetchProfileOnTokenChanges,
  onProfileChange,
}: Props) => {
  const [userProfileState, dispatch] = useReducer(reducer, initialState);
  const { activeTokenData, tokenManager } = useAuthentication();
  const currentLoadProfilePromiseRef = useRef<Promise<
    User | GuestUserNormalized
  > | null>(null);

  const loadProfileAux = useCallback(async (): Promise<
    User | GuestUserNormalized
  > => {
    dispatch({ type: ActionTypes.GetUserRequested });

    let usedAccessToken = null;

    const setAccessTokenRef = (accessToken: string) => {
      usedAccessToken = accessToken;
    };

    try {
      const userData: User | GuestUserNormalized = await getUser({
        [AuthenticationConfigOptions.UsedAccessTokenCallback]:
          setAccessTokenRef,
        [AuthenticationConfigOptions.IsGetUserProfileRequest]: true,
      });

      const tokenManagerCurrentActiveToken =
        tokenManager?.getActiveToken()?.data?.accessToken;

      // This is a safe check to ensure that the response obtained from the getUser
      // is still valid as there might have been a change on the active token
      // while the request has not returned. This will only happen on very extreme
      // situations like getUser taking a huge amount of time and after that a logout/login
      // happens that changes the current active token.
      if (tokenManagerCurrentActiveToken !== usedAccessToken) {
        throw new ProfileChangedError();
      }

      dispatch({
        type: ActionTypes.GetUserSucceeded,
        payload: userData,
      });

      currentLoadProfilePromiseRef.current = null;

      return userData;
    } catch (error) {
      dispatch({
        type: ActionTypes.GetUserFailed,
        payload: error as User | GuestUserNormalized | Error | undefined,
      });
      throw error;
    }
  }, [dispatch, tokenManager]);

  const loadProfile = useCallback(() => {
    const { isLoading } = userProfileState;

    if (isLoading) {
      return currentLoadProfilePromiseRef.current;
    }

    currentLoadProfilePromiseRef.current = loadProfileAux();

    return currentLoadProfilePromiseRef.current;
  }, [loadProfileAux, userProfileState]);

  // This useEffect call will check if there is a need to
  // call getUser client again to synchronize the user data
  // with the currently active access token.
  useEffect(() => {
    // Only check for token changes if the user specified as so
    if (!fetchProfileOnTokenChanges) {
      return;
    }

    const { error, isLoading, userData } = userProfileState;
    const activeTokenUserId = activeTokenData?.data?.userId;
    const userDataId = userData?.id;

    // Stop if there is a currently active error that might be
    // used to display for the user.
    /* istanbul ignore if */
    if (error) {
      return;
    }

    // Initial token state, discard.
    /* istanbul ignore if */
    if (!activeTokenData) {
      return;
    }

    if (
      activeTokenUserId !== userDataId ||
      (!activeTokenUserId && !userDataId)
    ) {
      if (!isLoading) {
        // Call loadProfile and discard the error as we do not need to handle it
        // as it will be added to the userProfileState by the loadProfile function.
        loadProfile()?.then(result => onProfileChange(result), noop);
      }
    }
  }, [
    activeTokenData,
    fetchProfileOnTokenChanges,
    loadProfile,
    onProfileChange,
    tokenManager,
    userProfileState,
  ]);

  return (
    <UserProfileContext.Provider
      value={{
        loadProfile,
        ...userProfileState,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileProvider;
