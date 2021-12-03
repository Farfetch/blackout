import { AuthenticationConfigOptions } from '@farfetch/blackout-client/helpers/client/interceptors/authentication';
import { getUser } from '@farfetch/blackout-client/users';
import { ProfileChangedError } from '../errors';
import noop from 'lodash/noop';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import useAuthentication from '../hooks/useAuthentication';
import UserProfileContext from './UserProfileContext';

const ActionTypes = {
  GetUserRequested: 'FETCH_USER_REQUESTED',
  GetUserSucceeded: 'FETCH_USER_SUCCEEDED',
  GetUserFailed: 'FETCH_USER_FAILED',
};

const initialState = {
  isLoading: false,
  error: null,
  userData: null,
};

const reducer = (state, action) => {
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
        userData: action.payload,
      };
    }

    case ActionTypes.GetUserFailed: {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

/**
 * Provides user profile state and a function to load it. Optionally,
 * it can keep the user profile data in sync with access token changes.
 * The user profile state data and loadProfile function will be accessible through
 * the useUserProfile hook.
 * This provider depends on the AuthenticationProvider to work.
 *
 * @example <caption>Adding the UserProfileProvider to your app</caption>
 *
 * import { AuthenticationProvider, UserProfileProvider } from '@farfetch/blackout-react/authentication/contexts';
 * import { useUserProfile } from '@farfetch/blackout-react/authentication/hooks';
 *
 * const App = () => {
 * return (<AuthenticationProvider><UserProfileProvider><MyComponent /></UserProfileProvider></AuthenticationProvider>);
 * }
 *
 * @param {object} props - Props for the provider.
 * @param {ReactNode} [props.children] - The children to be rendered by the provider.
 * @param {boolean} [props.fetchProfileOnTokenChanges=false] - Boolean to indicate if the provider should try to keep the user profile data in sync with the active token data.
 * @param {boolean} [props.onProfileChange] - Callback that runs after the profile changes.
 *
 */
const UserProfileProvider = ({
  children,
  fetchProfileOnTokenChanges,
  onProfileChange,
}) => {
  const [userProfileState, dispatch] = useReducer(reducer, initialState);
  const { activeTokenData, tokenManager } = useAuthentication();
  const currentLoadProfilePromiseRef = useRef(null);

  const loadProfileAux = useCallback(async () => {
    dispatch({ type: ActionTypes.GetUserRequested });

    const usedAccessTokenRef = {};

    const setAccessTokenRef = accessToken => {
      usedAccessTokenRef.current = accessToken;
    };

    try {
      const userData = await getUser({
        [AuthenticationConfigOptions.UsedAccessTokenCallback]:
          setAccessTokenRef,
      });

      const tokenManagerCurrentActiveToken =
        tokenManager.getActiveToken().data?.accessToken;

      // This is a safe check to ensure that the response obtained from the getUser
      // is still valid as there might have been a change on the active token
      // while the request has not returned. This will only happen on very extreme
      // situations like getUser taking a huge amount of time and after that a logout/login
      // happens that changes the current active token.
      if (tokenManagerCurrentActiveToken !== usedAccessTokenRef.current) {
        throw new ProfileChangedError();
      }

      // HACK: While the guestTokens/tokens endpoints do not return
      // the userId, we need to use the response from the getUser
      // client to associate a userId with a previously obtained token.
      // When these endpoints include this data, we can safely remove this call.
      await tokenManager.setUserInfo(userData);

      dispatch({
        type: ActionTypes.GetUserSucceeded,
        payload: userData,
      });

      currentLoadProfilePromiseRef.current = null;

      return userData;
    } catch (error) {
      dispatch({ type: ActionTypes.GetUserFailed, payload: error });
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
        loadProfile().then(result => onProfileChange?.(result), noop);
      }
    }
  }, [
    activeTokenData,
    fetchProfileOnTokenChanges,
    loadProfile,
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
