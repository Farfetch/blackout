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
  getRefreshToken, // @TODO: Remove in version 2.0
  getRegister,
  getResetPassword,
  getValidateEmail,
} from './reducer';
import { getUser } from '../../entities/redux/selectors';

/**
 * Returns the status of the user authentication status.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} IsAuthenticated.
 */
export const isAuthenticated = state =>
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
export const isLoginLoading = state => getLogin(state.authentication).isLoading;

/**
 * Returns the error for the login operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Login operation error.
 */
export const getLoginError = state => getLogin(state.authentication).error;

/**
 * Returns the loading status for the logout operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Logout Loading status.
 */
export const isLogoutLoading = state =>
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
export const getLogoutError = state => getLogout(state.authentication).error;

/**
 * Returns the loading status for the change password operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Change password Loading status.
 */
export const isChangePasswordLoading = state =>
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
export const getChangePasswordError = state =>
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
export const isRecoverPasswordLoading = state =>
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
export const getRecoverPasswordError = state =>
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
export const isResetPasswordLoading = state =>
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
export const getResetPasswordError = state =>
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
export const isRegisterLoading = state =>
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
export const getRegisterError = state =>
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
export const isValidateEmailLoading = state =>
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
export const getValidateEmailError = state =>
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
export const isRefreshEmailTokenLoading = state =>
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
export const getRefreshEmailTokenError = state =>
  getRefreshEmailToken(state.authentication).error;

/**
 * Returns the loading status for the refresh token operation
 //@TODO: Remove in version 2.0.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Refresh token operation Loading status.
 */
export const isRefreshTokenLoading = state =>
  getRefreshToken(state.authentication).isLoading;

/**
 * Returns the refresh token error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Refresh token operation error.
 */
export const getRefreshTokenError = state =>
  getRefreshToken(state.authentication).error;

/**
 * Returns the loading  for the authentication.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Authentication Loading status.
 */
export const isAuthenticationLoading = state =>
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
export const getAuthenticationError = state => getError(state.authentication);
