import {
  getChangePassword,
  getError,
  getIsLoading,
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
import { getUser } from '../entities/selectors';
import type { StoreState } from '../types';

/**
 * Returns the status of the user authentication status.
 *
 * @param state - Application state.
 *
 * @returns IsAuthenticated.
 */
export const isAuthenticated = (state: StoreState): boolean =>
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
export const isLoginLoading = (state: any): boolean =>
  getLogin(state.authentication).isLoading;

/**
 * Returns the error for the login operation.
 *
 * @param state - Application state.
 *
 * @returns Login operation error.
 */
export const getLoginError = (state: any): Record<string, unknown> =>
  getLogin(state.authentication).error;

/**
 * Returns the loading status for the logout operation.
 *
 * @param state - Application state.
 *
 * @returns Logout Loading status.
 */
export const isLogoutLoading = (state: any): boolean =>
  getLogout(state.authentication).isLoading;

/**
 * Returns the error for the logout operation.
 *
 * @param state - Application state.
 *
 * @returns Logout operation error.
 */
export const getLogoutError = (state: any): Record<string, unknown> =>
  getLogout(state.authentication).error;

/**
 * Returns the loading status for the change password operation.
 *
 * @param state - Application state.
 *
 * @returns Change password Loading status.
 */
export const isChangePasswordLoading = (state: any): boolean =>
  getChangePassword(state.authentication).isLoading;

/**
 * Returns the error for the change password operation.
 *
 * @param state - Application state.
 *
 * @returns Change password operation error.
 */
export const getChangePasswordError = (state: any): Record<string, unknown> =>
  getChangePassword(state.authentication).error;

/**
 * Returns the loading status for the recover password operation.
 *
 * @param state - Application state.
 *
 * @returns Recover password Loading status.
 */
export const isRecoverPasswordLoading = (state: any): boolean =>
  getRecoverPassword(state.authentication).isLoading;

/**
 * Returns the error for the recover password operation.
 *
 * @param state - Application state.
 *
 * @returns Recover password operation error.
 */
export const getRecoverPasswordError = (state: any): Record<string, unknown> =>
  getRecoverPassword(state.authentication).error;

/**
 * Returns the loading status for the reset password operation.
 *
 * @param state - Application state.
 *
 * @returns Reset password Loading status.
 */
export const isResetPasswordLoading = (state: any): boolean =>
  getResetPassword(state.authentication).isLoading;

/**
 * Returns the error for the reset password.
 *
 * @param state - Application state.
 *
 * @returns Reset password error.
 */
export const getResetPasswordError = (state: any): Record<string, unknown> =>
  getResetPassword(state.authentication).error;

/**
 * Returns the loading status for the register operation.
 *
 * @param state - Application state.
 *
 * @returns Register Loading status.
 */
export const isRegisterLoading = (state: any): boolean =>
  getRegister(state.authentication).isLoading;

/**
 * Returns the error for the register operation.
 *
 * @param state - Application state.
 *
 * @returns Register operation error.
 */
export const getRegisterError = (state: any): Record<string, unknown> =>
  getRegister(state.authentication).error;

/**
 * Returns the loading status for the validate email operation.
 *
 * @param state - Application state.
 *
 * @returns Validate email Loading status.
 */
export const isValidateEmailLoading = (state: any): boolean =>
  getValidateEmail(state.authentication).isLoading;

/**
 * Returns the error for the validate email operation.
 *
 * @param state - Application state.
 *
 * @returns Validate email error.
 */
export const getValidateEmailError = (state: any): Record<string, unknown> =>
  getValidateEmail(state.authentication).error;

/**
 * Returns the loading status for the refresh email token operation.
 *
 * @param state - Application state.
 *
 * @returns Refresh email token operation Loading status.
 */
export const isRefreshEmailTokenLoading = (state: any): boolean =>
  getRefreshEmailToken(state.authentication).isLoading;

/**
 * Returns the refresh email token error.
 *
 * @param state - Application state.
 *
 * @returns Refresh email token operation error.
 */
export const getRefreshEmailTokenError = (
  state: any,
): Record<string, unknown> => getRefreshEmailToken(state.authentication).error;

/**
 * Returns the loading status for the user token operation.
 *
 * @param state - Application state.
 *
 * @returns User token operation Loading status.
 */
export const isUserTokenLoading = (state: any): boolean =>
  getUserToken(state.authentication).isLoading;

/**
 * Returns the get user token error.
 *
 * @param state - Application state.
 *
 * @returns Get user token operation error.
 */
export const getUserTokenError = (state: any): Record<string, unknown> =>
  getUserToken(state.authentication).error;

/**
 * Returns the result for the get user token operation.
 *
 * @param state - Application state.
 *
 * @returns Get user token operation result.
 */
export const getUserTokenResult = (state: any): Record<string, unknown> =>
  getUserToken(state.authentication).result;

/**
 * Returns the loading status for the user impersonation operation.
 *
 * @param state - Application state.
 *
 * @returns User impersonation operation Loading status.
 */
export const isUserImpersonationLoading = (state: any): boolean =>
  getUserImpersonation(state.authentication).isLoading;

/**
 * Returns the get user impersonation error.
 *
 * @param state - Application state.
 *
 * @returns User impersonation operation error.
 */
export const getUserImpersonationError = (
  state: any,
): Record<string, unknown> => getUserImpersonation(state.authentication).error;

/**
 * Returns the result for the user impersonation operation.
 *
 * @param state - Application state.
 *
 * @returns User impersonation operation result.
 */
export const getUserImpersonationResult = (
  state: any,
): Record<string, unknown> => getUserImpersonation(state.authentication).result;

/**
 * Returns the loading for the authentication.
 *
 * @param state - Application state.
 *
 * @returns Authentication Loading status.
 */
export const isAuthenticationLoading = (state: any): boolean =>
  getIsLoading(state.authentication);

/**
 * Returns the authentication error.
 *
 * @param state - Application state.
 *
 * @returns Authentication error.
 */
export const getAuthenticationError = (state: any): Record<string, unknown> =>
  getError(state.authentication);
