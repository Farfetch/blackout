import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import reducerFactory from '../../helpers/reducerFactory';
import type { AuthenticationState } from './types';

export const INITIAL_STATE: AuthenticationState = {
  login: {
    error: null,
    isLoading: false,
  },
  logout: {
    error: null,
    isLoading: false,
  },
  register: {
    error: null,
    isLoading: false,
  },
  changePassword: {
    error: null,
    isLoading: false,
  },
  recoverPassword: {
    error: null,
    isLoading: false,
  },
  resetPassword: {
    error: null,
    isLoading: false,
  },
  validateEmail: {
    error: null,
    isLoading: false,
  },
  refreshEmailToken: {
    error: null,
    isLoading: false,
  },
  userToken: {
    result: null,
    error: null,
    isLoading: false,
  },
  userImpersonation: {
    result: null,
    error: null,
    isLoading: false,
  },
};

export const login = reducerFactory('LOGIN', INITIAL_STATE.login, actionTypes);
export const logout = reducerFactory(
  'LOGOUT',
  INITIAL_STATE.logout,
  actionTypes,
);
export const register = reducerFactory(
  'REGISTER',
  INITIAL_STATE.register,
  actionTypes,
);
export const changePassword = reducerFactory(
  'PASSWORD_CHANGE',
  INITIAL_STATE.changePassword,
  actionTypes,
);
export const resetPassword = reducerFactory(
  'PASSWORD_RESET',
  INITIAL_STATE.resetPassword,
  actionTypes,
);
export const recoverPassword = reducerFactory(
  'PASSWORD_RECOVER',
  INITIAL_STATE.recoverPassword,
  actionTypes,
);
export const validateEmail = reducerFactory(
  'VALIDATE_EMAIL',
  INITIAL_STATE.validateEmail,
  actionTypes,
);
export const refreshEmailToken = reducerFactory(
  'REFRESH_EMAIL_TOKEN',
  INITIAL_STATE.refreshEmailToken,
  actionTypes,
);
export const userToken = (
  state = INITIAL_STATE.userToken,
  action: AnyAction,
): AuthenticationState['userToken'] => {
  switch (action?.type) {
    case actionTypes.DELETE_USER_TOKEN_REQUEST:
    case actionTypes.CREATE_USER_TOKEN_REQUEST:
    case actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_REQUEST:
    case actionTypes.REFRESH_USER_TOKEN_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.userToken.error,
        isLoading: true,
      };
    case actionTypes.DELETE_USER_TOKEN_SUCCESS:
      return {
        result: INITIAL_STATE.userToken.result,
        error: INITIAL_STATE.userToken.error,
        isLoading: false,
      };

    case actionTypes.CREATE_USER_TOKEN_SUCCESS:
    case actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_SUCCESS:
    case actionTypes.REFRESH_USER_TOKEN_SUCCESS:
      return {
        result: action?.payload,
        error: INITIAL_STATE.userToken.error,
        isLoading: false,
      };

    case actionTypes.DELETE_USER_TOKEN_FAILURE:
    case actionTypes.CREATE_USER_TOKEN_FAILURE:
    case actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_FAILURE:
    case actionTypes.REFRESH_USER_TOKEN_FAILURE:
      return {
        ...state,
        error: action?.payload?.error,
        isLoading: false,
      };

    default:
      return state;
  }
};
export const userImpersonation = (
  state = INITIAL_STATE.userImpersonation,
  action: AnyAction,
): AuthenticationState['userImpersonation'] => {
  switch (action?.type) {
    case actionTypes.DELETE_USER_IMPERSONATION_REQUEST:
    case actionTypes.CREATE_USER_IMPERSONATION_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.userImpersonation.error,
        isLoading: true,
      };
    case actionTypes.CREATE_USER_IMPERSONATION_SUCCESS:
      return {
        result: action?.payload,
        error: INITIAL_STATE.userImpersonation.error,
        isLoading: false,
      };

    case actionTypes.DELETE_USER_IMPERSONATION_SUCCESS:
      return {
        result: INITIAL_STATE.userImpersonation.result,
        error: INITIAL_STATE.userImpersonation.error,
        isLoading: false,
      };

    case actionTypes.DELETE_USER_IMPERSONATION_FAILURE:
    case actionTypes.CREATE_USER_IMPERSONATION_FAILURE:
      return {
        ...state,
        error: action?.payload?.error,
        isLoading: false,
      };

    default:
      return state;
  }
};

export const getLogin = (state: AuthenticationState) => state.login;
export const getLogout = (state: AuthenticationState) => state.logout;
export const getRegister = (state: AuthenticationState) => state.register;
export const getChangePassword = (state: AuthenticationState) =>
  state.changePassword;
export const getResetPassword = (state: AuthenticationState) =>
  state.resetPassword;
export const getRecoverPassword = (state: AuthenticationState) =>
  state.recoverPassword;
export const getValidateEmail = (state: AuthenticationState) =>
  state.validateEmail;
export const getRefreshEmailToken = (state: AuthenticationState) =>
  state.refreshEmailToken;
export const getUserToken = (state: AuthenticationState) => state.userToken;
export const getUserImpersonation = (state: AuthenticationState) =>
  state.userImpersonation;

/**
 * Reducer for authentication state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
export default combineReducers({
  login,
  logout,
  register,
  changePassword,
  resetPassword,
  recoverPassword,
  validateEmail,
  refreshEmailToken,
  userToken,
  userImpersonation,
});
