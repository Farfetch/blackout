/**
 * @module authentication/selectors
 * @category Authentication
 * @subcategory Selectors
 */

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

/**
 * Returns the status of the user authentication status.
 *
 * @function
 * @param {object} state - Application state.
 * @param {object} state.user - User entity.
 * @param {boolean} state.user.isGuest - User type.
 * @param {number} state.user.id - User id.
 * @returns {boolean} IsAuthenticated.
 */
export const isAuthenticated = (state: {
  user: { isGuest: boolean; id: number };
}): boolean =>
  Boolean(getUser(state) && !getUser(state).isGuest && getUser(state).id);

/**
 * Returns the error or loading status of each sub-area.
 */

/**
 * Returns the loading status for the login operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Login Loading status.
 */
export const isLoginLoading = (state: any): boolean =>
  getLogin(state.authentication).isLoading;

/**
 * Returns the error for the login operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Login operation error.
 */
export const getLoginError = (state: any): Record<string, unknown> =>
  getLogin(state.authentication).error;

/**
 * Returns the loading status for the logout operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Logout Loading status.
 */
export const isLogoutLoading = (state: any): boolean =>
  getLogout(state.authentication).isLoading;

/**
 * Returns the error for the logout operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Logout operation error.
 */
export const getLogoutError = (state: any): Record<string, unknown> =>
  getLogout(state.authentication).error;

/**
 * Returns the loading status for the change password operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Change password Loading status.
 */
export const isChangePasswordLoading = (state: any): boolean =>
  getChangePassword(state.authentication).isLoading;

/**
 * Returns the error for the change password operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Change password operation error.
 */
export const getChangePasswordError = (state: any): Record<string, unknown> =>
  getChangePassword(state.authentication).error;

/**
 * Returns the loading status for the recover password operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Recover password Loading status.
 */
export const isRecoverPasswordLoading = (state: any): boolean =>
  getRecoverPassword(state.authentication).isLoading;

/**
 * Returns the error for the recover password operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Recover password operation error.
 */
export const getRecoverPasswordError = (state: any): Record<string, unknown> =>
  getRecoverPassword(state.authentication).error;

/**
 * Returns the loading status for the reset password operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Reset password Loading status.
 */
export const isResetPasswordLoading = (state: any): boolean =>
  getResetPassword(state.authentication).isLoading;

/**
 * Returns the error for the reset password.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Reset password error.
 */
export const getResetPasswordError = (state: any): Record<string, unknown> =>
  getResetPassword(state.authentication).error;

/**
 * Returns the loading status for the register operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Register Loading status.
 */
export const isRegisterLoading = (state: any): boolean =>
  getRegister(state.authentication).isLoading;

/**
 * Returns the error for the register operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Register operation error.
 */
export const getRegisterError = (state: any): Record<string, unknown> =>
  getRegister(state.authentication).error;

/**
 * Returns the loading status for the validate email operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Validate email Loading status.
 */
export const isValidateEmailLoading = (state: any): boolean =>
  getValidateEmail(state.authentication).isLoading;

/**
 * Returns the error for the validate email operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Validate email error.
 */
export const getValidateEmailError = (state: any): Record<string, unknown> =>
  getValidateEmail(state.authentication).error;

/**
 * Returns the loading status for the refresh email token operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Refresh email token operation Loading status.
 */
export const isRefreshEmailTokenLoading = (state: any): boolean =>
  getRefreshEmailToken(state.authentication).isLoading;

/**
 * Returns the refresh email token error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Refresh email token operation error.
 */
export const getRefreshEmailTokenError = (
  state: any,
): Record<string, unknown> => getRefreshEmailToken(state.authentication).error;

/**
 * Returns the loading status for the user token operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} User token operation Loading status.
 */
export const isUserTokenLoading = (state: any): boolean =>
  getUserToken(state.authentication).isLoading;

/**
 * Returns the get user token error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Get user token operation error.
 */
export const getUserTokenError = (state: any): Record<string, unknown> =>
  getUserToken(state.authentication).error;

/**
 * Returns the result for the get user token operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Get user token operation result.
 */
export const getUserTokenResult = (state: any): Record<string, unknown> =>
  getUserToken(state.authentication).result;

/**
 * Returns the loading status for the user impersonation operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} User impersonation operation Loading status.
 */
export const isUserImpersonationLoading = (state: any): boolean =>
  getUserImpersonation(state.authentication).isLoading;

/**
 * Returns the get user impersonation error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} User impersonation operation error.
 */
export const getUserImpersonationError = (
  state: any,
): Record<string, unknown> => getUserImpersonation(state.authentication).error;

/**
 * Returns the result for the user impersonation operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} User impersonation operation result.
 */
export const getUserImpersonationResult = (
  state: any,
): Record<string, unknown> => getUserImpersonation(state.authentication).result;

/**
 * Returns the loading  for the authentication.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Authentication Loading status.
 */
export const isAuthenticationLoading = (state: any): boolean =>
  getIsLoading(state.authentication);

/**
 * Returns the authentication error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Authentication error.
 */
export const getAuthenticationError = (state: any): Record<string, unknown> =>
  getError(state.authentication);
