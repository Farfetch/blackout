/**
 * @module authentication/reducer
 * @category Authentication
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { reducerFactory } from '../../helpers/redux';

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
  // TODO: Remove in version 2.0
  refreshToken: {
    error: null,
    isLoading: false,
  },
  refreshEmailToken: {
    error: null,
    isLoading: false,
  },
};

const error = (state = INITIAL_STATE.error, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.LOGOUT_FAILURE:
    case actionTypes.REGISTER_FAILURE:
    case actionTypes.PASSWORD_CHANGE_FAILURE:
    case actionTypes.PASSWORD_RECOVER_FAILURE:
    case actionTypes.PASSWORD_RESET_FAILURE:
      return action.payload.error;
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

const id = (state = INITIAL_STATE.id, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.REGISTER_SUCCESS:
      return action.payload.result;
    case actionTypes.LOGOUT_SUCCESS:
    case actionTypes.AUTHENTICATION_RESET:
      return INITIAL_STATE.id;
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action = {}) => {
  switch (action.type) {
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
export const refreshToken = reducerFactory(
  'REFRESH_TOKEN',
  INITIAL_STATE.refreshToken,
  actionTypes,
);
export const refreshEmailToken = reducerFactory(
  'REFRESH_EMAIL_TOKEN',
  INITIAL_STATE.refreshEmailToken,
  actionTypes,
);

export const entitiesMapper = {
  [actionTypes.LOGOUT_SUCCESS]: state => {
    return {
      ...state,
      user: {},
    };
  },
};

export const getError = state => state.error;
export const getIsLoading = state => state.isLoading;
export const getId = state => state.id;
export const getLogin = state => state.login;
export const getLogout = state => state.logout;
export const getRegister = state => state.register;
export const getChangePassword = state => state.changePassword;
export const getResetPassword = state => state.resetPassword;
export const getRecoverPassword = state => state.recoverPassword;
export const getValidateEmail = state => state.validateEmail;
export const getRefreshEmailToken = state => state.refreshEmailToken;
export const getRefreshToken = state => state.refreshToken; // @TODO: Remove in version 2.0

/**
 * Reducer for authentication state.
 *
 * @function authenticationReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
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
  refreshToken, // @TODO: To remove in the next version 2.0
  refreshEmailToken,
});
