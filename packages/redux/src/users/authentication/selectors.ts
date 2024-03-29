import { getAuthentication } from '../reducer.js';
import {
  getChangePassword,
  getExternalLogins,
  getLogin,
  getLogout,
  getRecoverPassword,
  getRefreshEmailToken,
  getRegister,
  getResetPassword,
  getToken,
  getValidateEmail,
} from './reducer.js';
import { getUser } from '../../users/selectors.js';
import type { StoreState } from '../../types/index.js';
import type { UsersState } from '../types/index.js';

/**
 * Returns the status of the user authentication status.
 *
 * @param state - Application state.
 *
 * @returns True if the user is authenticated, false otherwise.
 */
export const isAuthenticated = (state: StoreState) =>
  Boolean(getUser(state) && !getUser(state)?.isGuest && getUser(state)?.id);

/**
 * Returns the loading status for the login operation.
 *
 * @param state - Application state.
 *
 * @returns Login Loading status.
 */
export const isLoginLoading = (state: StoreState) =>
  getLogin(getAuthentication(state.users as UsersState)).isLoading;

/**
 * Returns the error for the login operation.
 *
 * @param state - Application state.
 *
 * @returns Login operation error.
 */
export const getLoginError = (state: StoreState) =>
  getLogin(getAuthentication(state.users as UsersState)).error;

/**
 * Returns the loading status for the logout operation.
 *
 * @param state - Application state.
 *
 * @returns Logout Loading status.
 */
export const isLogoutLoading = (state: StoreState) =>
  getLogout(getAuthentication(state.users as UsersState)).isLoading;

/**
 * Returns the error for the logout operation.
 *
 * @param state - Application state.
 *
 * @returns Logout operation error.
 */
export const getLogoutError = (state: StoreState) =>
  getLogout(getAuthentication(state.users as UsersState)).error;

/**
 * Returns the loading status for the change password operation.
 *
 * @param state - Application state.
 *
 * @returns Change password Loading status.
 */
export const isChangePasswordLoading = (state: StoreState) =>
  getChangePassword(getAuthentication(state.users as UsersState)).isLoading;

/**
 * Returns the error for the change password operation.
 *
 * @param state - Application state.
 *
 * @returns Change password operation error.
 */
export const getChangePasswordError = (state: StoreState) =>
  getChangePassword(getAuthentication(state.users as UsersState)).error;

/**
 * Returns the loading status for the recover password operation.
 *
 * @param state - Application state.
 *
 * @returns Recover password Loading status.
 */
export const isRecoverPasswordLoading = (state: StoreState) =>
  getRecoverPassword(getAuthentication(state.users as UsersState)).isLoading;

/**
 * Returns the error for the recover password operation.
 *
 * @param state - Application state.
 *
 * @returns Recover password operation error.
 */
export const getRecoverPasswordError = (state: StoreState) =>
  getRecoverPassword(getAuthentication(state.users as UsersState)).error;

/**
 * Returns the loading status for the reset password operation.
 *
 * @param state - Application state.
 *
 * @returns Reset password Loading status.
 */
export const isResetPasswordLoading = (state: StoreState) =>
  getResetPassword(getAuthentication(state.users as UsersState)).isLoading;

/**
 * Returns the error for the reset password.
 *
 * @param state - Application state.
 *
 * @returns Reset password error.
 */
export const getResetPasswordError = (state: StoreState) =>
  getResetPassword(getAuthentication(state.users as UsersState)).error;

/**
 * Returns the loading status for the register operation.
 *
 * @param state - Application state.
 *
 * @returns Register Loading status.
 */
export const isRegisterLoading = (state: StoreState) =>
  getRegister(getAuthentication(state.users as UsersState)).isLoading;

/**
 * Returns the error for the register operation.
 *
 * @param state - Application state.
 *
 * @returns Register operation error.
 */
export const getRegisterError = (state: StoreState) =>
  getRegister(getAuthentication(state.users as UsersState)).error;

/**
 * Returns the loading status for the validate email operation.
 *
 * @param state - Application state.
 *
 * @returns Validate email Loading status.
 */
export const isValidateEmailLoading = (state: StoreState) =>
  getValidateEmail(getAuthentication(state.users as UsersState)).isLoading;

/**
 * Returns the error for the validate email operation.
 *
 * @param state - Application state.
 *
 * @returns Validate email error.
 */
export const getValidateEmailError = (state: StoreState) =>
  getValidateEmail(getAuthentication(state.users as UsersState)).error;

/**
 * Returns the loading status for the refresh email token operation.
 *
 * @param state - Application state.
 *
 * @returns Refresh email token operation Loading status.
 */
export const isRefreshEmailTokenLoading = (state: StoreState) =>
  getRefreshEmailToken(getAuthentication(state.users as UsersState)).isLoading;

/**
 * Returns the refresh email token error.
 *
 * @param state - Application state.
 *
 * @returns Refresh email token operation error.
 */
export const getRefreshEmailTokenError = (state: StoreState) =>
  getRefreshEmailToken(getAuthentication(state.users as UsersState)).error;

/**
 * Returns the loading status for the create/refresh/delete token operations.
 *
 * @param state - Application state.
 *
 * @returns Create/refresh/delete token operations loading status.
 */
export const isTokenLoading = (state: StoreState) =>
  getToken(getAuthentication(state.users as UsersState)).isLoading;

/**
 * Returns the create/refresh/delete token operations error.
 *
 * @param state - Application state.
 *
 * @returns Create/refresh/delete token operations error.
 */
export const getTokenError = (state: StoreState) =>
  getToken(getAuthentication(state.users as UsersState)).error;

/**
 * Returns the result for the create/refresh/delete token operations.
 *
 * @param state - Application state.
 *
 * @returns Create/refresh token operations result.
 */
export const getTokenResult = (state: StoreState) =>
  getToken(getAuthentication(state.users as UsersState)).result;

/**
 * Returns the loading status for the fetch/delete external logins operations.
 *
 * @param state - Application state.
 *
 * @returns Fetch/delete external logins operations loading status.
 */
export const areExternalLoginsLoading = (state: StoreState) =>
  getExternalLogins(getAuthentication(state.users as UsersState)).isLoading;

/**
 * Returns the fetch/delete external logins operations error.
 *
 * @param state - Application state.
 *
 * @returns Fetch/delete external logins operations error.
 */
export const getExternalLoginsError = (state: StoreState) =>
  getExternalLogins(getAuthentication(state.users as UsersState)).error;

/**
 * Returns the result for the fetch/delete external logins operations.
 *
 * @param state - Application state.
 *
 * @returns Fetch/delete external logins operations result.
 */
export const getExternalLoginsResult = (state: StoreState) =>
  getExternalLogins(getAuthentication(state.users as UsersState)).result;
