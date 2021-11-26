import {
  AuthenticationConfigOptions,
  TokenKinds,
} from '@farfetch/blackout-client/helpers/client/interceptors/authentication';
import {
  deleteTokens,
  postTokens,
} from '@farfetch/blackout-client/authentication';
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
  }
};

/**
 * Helper hook used by AuthenticationProvider to manage user login status.
 *
 * @param {object} params
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

        const tokenData = await postTokens(
          { grantType: 'password', ...loginData },
          { [AuthenticationConfigOptions.NoAuthentication]: true },
        );

        tokenManager.setRememberMe(rememberMe);
        await tokenManager.setUserTokenData({ ...tokenData }, true);

        dispatch({ type: ActionTypes.LoginSucceeded });

        return tokenData;
      } catch (e) {
        dispatch({ type: ActionTypes.LoginFailed, payload: e });
        throw e;
      }
    },
    [assertNotLoading, dispatch, state, tokenManager],
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

      try {
        await deleteTokens(currentAccessToken);
      } catch (e) {
        // The token does not exist anymore, so the user has effectively been
        // logged out. For now, the server returns for this case a 400 status
        // with a 17 code, but there is a possibility that this will be changed
        // to a 404 code, so check both cases for now and assume it is an error
        // only when the error is not one of these cases.
        if ((e.status !== 400 || e.code !== '17') && e.status !== 404) {
          throw e;
        }
      }

      tokenManager.selectGuestTokenProvider();

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
