import * as actionTypes from './actionTypes';
import { CombinedState, combineReducers } from 'redux';
import { reducerFactory } from '../helpers';
interface Action {
  type: string;
  payload?: {
    result?: any;
    error?: any;
  };
}

const INITIAL_STATE = {
  error: null,
  id: null,
  isLoading: false,
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

const error = (state = INITIAL_STATE.error, action: Action) => {
  switch (action?.type) {
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.LOGOUT_FAILURE:
    case actionTypes.REGISTER_FAILURE:
    case actionTypes.PASSWORD_CHANGE_FAILURE:
    case actionTypes.PASSWORD_RECOVER_FAILURE:
    case actionTypes.PASSWORD_RESET_FAILURE:
      return action?.payload?.error;
    case actionTypes.AUTHENTICATION_RESET:
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.LOGOUT_REQUEST:
    case actionTypes.PASSWORD_CHANGE_REQUEST:
    case actionTypes.PASSWORD_RECOVER_REQUEST:
    case actionTypes.PASSWORD_RESET_REQUEST:
    case actionTypes.REGISTER_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const id = (state = INITIAL_STATE.id, action: Action) => {
  switch (action?.type) {
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.REGISTER_SUCCESS:
      return action?.payload?.result;
    case actionTypes.AUTHENTICATION_RESET:
    case actionTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE.id;
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: Action) => {
  switch (action?.type) {
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.LOGOUT_REQUEST:
    case actionTypes.REGISTER_REQUEST:
    case actionTypes.PASSWORD_CHANGE_REQUEST:
    case actionTypes.PASSWORD_RECOVER_REQUEST:
    case actionTypes.PASSWORD_RESET_REQUEST:
      return true;
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.LOGOUT_SUCCESS:
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.PASSWORD_CHANGE_SUCCESS:
    case actionTypes.PASSWORD_RECOVER_SUCCESS:
    case actionTypes.PASSWORD_RESET_SUCCESS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
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
  action: Action,
): { result: any; error: any; isLoading: any } => {
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
  action: Action,
): { result: any; error: any; isLoading: any } => {
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

/**
 * Export entities action mapper.
 */

export const entitiesMapper = {
  [actionTypes.LOGOUT_SUCCESS as typeof actionTypes.LOGOUT_SUCCESS]: (
    state: CombinedState<any>,
  ): CombinedState<any> => {
    return {
      ...state,
      user: {},
    };
  },
};

export const getError = (state: { error?: any }): any => state.error;
export const getIsLoading = (state: { isLoading: boolean }): boolean =>
  state.isLoading;
export const getId = (state: { id: number }): number => state.id;
export const getLogin = (state: { login: any }): any => state.login;
export const getLogout = (state: { logout: any }): any => state.logout;
export const getRegister = (state: { register: any }): any => state.register;
export const getChangePassword = (state: { changePassword: any }): any =>
  state.changePassword;
export const getResetPassword = (state: { resetPassword: any }): any =>
  state.resetPassword;
export const getRecoverPassword = (state: { recoverPassword: any }): any =>
  state.recoverPassword;
export const getValidateEmail = (state: { validateEmail: any }): any =>
  state.validateEmail;
export const getRefreshEmailToken = (state: { refreshEmailToken: any }): any =>
  state.refreshEmailToken;
export const getUserToken = (state: { userToken: any }): any => state.userToken;
export const getUserImpersonation = (state: { userImpersonation: any }): any =>
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
  error,
  id,
  isLoading,
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
