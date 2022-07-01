import { getAuthentication } from '../reducer';
import {
  getChangePassword,
  getLogin,
  getLogout,
  getRecoverPassword,
  getRefreshEmailToken,
  getRegister,
  getResetPassword,
  getUserImpersonation,
  getUserToken,
  getValidateEmail,
} from './reducer';
import { getUser } from '../../entities/selectors';
import type { StoreState } from '../../types';
import type { UsersState } from '../types';

/**
 * Returns the status of the user authentication status.
 *
 * @param state - Application state.
 *
 * @returns IsAuthenticated.
 */
export const isAuthenticated = (state: StoreState) =>
  Boolean(getUser(state) && !getUser(state).isGuest && getUser(state).id);

/**
 * Returns the error or loading status of each sub-area.
 */

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
 * Returns the loading status for the user token operation.
 *
 * @param state - Application state.
 *
 * @returns User token operation Loading status.
 */
export const isUserTokenLoading = (state: StoreState) =>
  getUserToken(getAuthentication(state.users as UsersState)).isLoading;

/**
 * Returns the get user token error.
 *
 * @param state - Application state.
 *
 * @returns Get user token operation error.
 */
export const getUserTokenError = (state: StoreState) =>
  getUserToken(getAuthentication(state.users as UsersState)).error;

/**
 * Returns the result for the get user token operation.
 *
 * @param state - Application state.
 *
 * @returns Get user token operation result.
 */
export const getUserTokenResult = (state: StoreState) =>
  getUserToken(getAuthentication(state.users as UsersState)).result;

/**
 * Returns the loading status for the user impersonation operation.
 *
 * @param state - Application state.
 *
 * @returns User impersonation operation Loading status.
 */
export const isUserImpersonationLoading = (state: StoreState): boolean =>
  getUserImpersonation(getAuthentication(state.users as UsersState)).isLoading;

/**
 * Returns the get user impersonation error.
 *
 * @param state - Application state.
 *
 * @returns User impersonation operation error.
 */
export const getUserImpersonationError = (state: StoreState) =>
  getUserImpersonation(getAuthentication(state.users as UsersState)).error;

/**
 * Returns the result for the user impersonation operation.
 *
 * @param state - Application state.
 *
 * @returns User impersonation operation result.
 */
export const getUserImpersonationResult = (state: StoreState) =>
  getUserImpersonation(getAuthentication(state.users as UsersState)).result;
