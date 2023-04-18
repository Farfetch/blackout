import * as actionTypes from './actionTypes.js';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import reducerFactory from '../../helpers/reducerFactory.js';
import type { AuthenticationState } from './types/index.js';

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
  token: {
    result: null,
    error: null,
    isLoading: false,
  },
};

export const login = reducerFactory('Login', INITIAL_STATE.login, actionTypes);
export const logout = reducerFactory(
  'Logout',
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
export const token = (
  state = INITIAL_STATE.token,
  action: AnyAction,
): AuthenticationState['token'] => {
  switch (action?.type) {
    case actionTypes.REMOVE_TOKEN_REQUEST:
    case actionTypes.CREATE_USER_TOKEN_REQUEST:
    case actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_REQUEST:
    case actionTypes.REFRESH_TOKEN_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.token.error,
        isLoading: true,
      };
    case actionTypes.REMOVE_TOKEN_SUCCESS:
      return {
        result: INITIAL_STATE.token.result,
        error: INITIAL_STATE.token.error,
        isLoading: false,
      };

    case actionTypes.CREATE_USER_TOKEN_SUCCESS:
    case actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_SUCCESS:
    case actionTypes.REFRESH_TOKEN_SUCCESS:
      return {
        result: action?.payload,
        error: INITIAL_STATE.token.error,
        isLoading: false,
      };

    case actionTypes.REMOVE_TOKEN_FAILURE:
    case actionTypes.CREATE_USER_TOKEN_FAILURE:
    case actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_FAILURE:
    case actionTypes.REFRESH_TOKEN_FAILURE:
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
export const getToken = (state: AuthenticationState) => state.token;

/**
 * Reducer for authentication state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const authenticationReducer: Reducer<AuthenticationState> = combineReducers({
  login,
  logout,
  register,
  changePassword,
  resetPassword,
  recoverPassword,
  validateEmail,
  refreshEmailToken,
  token,
});

export default authenticationReducer;
