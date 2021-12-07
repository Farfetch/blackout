import {
  AuthenticationConfigOptions,
  TokenKinds,
} from '@farfetch/blackout-core/helpers/client/interceptors/authentication';
import {
  deleteTokens,
  postTokens,
} from '@farfetch/blackout-core/authentication/client';
import {
  LoginWithoutDataError,
  NotLoggedInError,
  PendingUserOperationError,
} from '../errors';
import { useCallback, useMemo, useReducer } from 'react';

export const ActionTypes = {
  LoginRequested: 'LOGIN_REQUESTED',
  LoginSucceeded: 'LOGIN_SUCCEEDED',
  LoginFailed: 'LOGIN_FAILED',
  LogoutRequested: 'LOGOUT_REQUESTED',
  LogoutSucceeded: 'LOGOUT_SUCCEEDED',
  LogoutFailed: 'LOGOUT_FAILED',
};

const initialState = {
  isLoading: false,
  errorData: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.LoginRequested:
    case ActionTypes.LogoutRequested: {
      return {
        ...state,
        isLoading: true,
        errorData: null,
      };
    }

    case ActionTypes.LoginSucceeded:
    case ActionTypes.LogoutSucceeded: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case ActionTypes.LoginFailed:
    case ActionTypes.LogoutFailed: {
      return {
        ...state,
        isLoading: false,
        errorData: {
          causeError: action.payload,
          context: action.type,
        },
      };
    }

    default:
      return state;
  }
};

/**
 * Helper hook used by AuthenticationProvider to manage user login status.
 *
 * @param {object} params - Parameters object.
 * @param {object} params.activeTokenData - Active token data kept by AuthenticationProvider.
 * @param {object} params.tokenManager - Active instance of axios token manager used by AuthenticationProvider.
 * @returns {object} An object containing the user login status state and login/logout functions.
 */
const useUserAuthState = ({ activeTokenData, tokenManager }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const assertNotLoading = useCallback(() => {
    const { isLoading } = state;

    if (isLoading) {
      throw new PendingUserOperationError();
    }
  }, [state]);

  const login = useCallback(
    async data => {
      assertNotLoading();

      try {
        dispatch({ type: ActionTypes.LoginRequested });

        if (!data) {
          throw new LoginWithoutDataError();
        }

        const { rememberMe = false, ...loginData } = data;

        tokenManager.setRememberMe(rememberMe);

        const tokenData = await postTokens(
          { grantType: 'password', ...loginData },
          {
            [AuthenticationConfigOptions.IsLoginRequest]: true,
            [AuthenticationConfigOptions.NoAuthentication]: true,
          },
        );

        dispatch({ type: ActionTypes.LoginSucceeded });

        return tokenData;
      } catch (e) {
        dispatch({ type: ActionTypes.LoginFailed, payload: e });
        throw e;
      }
    },
    [assertNotLoading, dispatch, tokenManager],
  );

  const logout = useCallback(async () => {
    assertNotLoading();

    try {
      dispatch({ type: ActionTypes.LogoutRequested });

      if (activeTokenData?.kind !== TokenKinds.User) {
        throw new NotLoggedInError();
      }

      const currentAccessToken = activeTokenData?.data?.accessToken;

      if (!currentAccessToken) {
        throw new NotLoggedInError();
      }

      await deleteTokens(currentAccessToken, {
        [AuthenticationConfigOptions.IsLogoutRequest]: true,
      });

      dispatch({ type: ActionTypes.LogoutSucceeded });
    } catch (e) {
      dispatch({ type: ActionTypes.LogoutFailed, payload: e });
      throw e;
    }
  }, [activeTokenData, assertNotLoading, dispatch]);

  const isLoggedIn = useMemo(() => {
    return (
      activeTokenData?.kind === TokenKinds.User &&
      !!activeTokenData?.data?.accessToken
    );
  }, [activeTokenData]);

  return {
    login,
    logout,
    isLoggedIn,
    ...state,
  };
};

export default useUserAuthState;
