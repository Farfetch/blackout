/**
 * @module authentication/actionTypes
 * @category Authentication
 * @subcategory Actions
 */

/** Action type dispatched when the login request fails. */
export const LOGIN_FAILURE = '@farfetch/blackout-core/LOGIN_FAILURE';
/** Action type dispatched when the login request starts. */
export const LOGIN_REQUEST = '@farfetch/blackout-core/LOGIN_REQUEST';
/** Action type dispatched when the login request succeeds. */
export const LOGIN_SUCCESS = '@farfetch/blackout-core/LOGIN_SUCCESS';
/** Action type dispatched when the client wants to reset the login request redux data. */
export const LOGIN_RESET = '@farfetch/blackout-core/LOGIN_RESET';

/** Action type dispatched when the logout request fails. */
export const LOGOUT_FAILURE = '@farfetch/blackout-core/LOGOUT_FAILURE';
/** Action type dispatched when the logout request starts. */
export const LOGOUT_REQUEST = '@farfetch/blackout-core/LOGOUT_REQUEST';
/** Action type dispatched when the logout request succeeds. */
export const LOGOUT_SUCCESS = '@farfetch/blackout-core/LOGOUT_SUCCESS';
/** Action type dispatched when the client wants to reset the logout request redux data. */
export const LOGOUT_RESET = '@farfetch/blackout-core/LOGOUT_RESET';

/** Action type dispatched when the change password request fails. */
export const PASSWORD_CHANGE_FAILURE =
  '@farfetch/blackout-core/PASSWORD_CHANGE_FAILURE';
/** Action type dispatched when the change password request starts. */
export const PASSWORD_CHANGE_REQUEST =
  '@farfetch/blackout-core/PASSWORD_CHANGE_REQUEST';
/** Action type dispatched when the change password request succeeds. */
export const PASSWORD_CHANGE_SUCCESS =
  '@farfetch/blackout-core/PASSWORD_CHANGE_SUCCESS';
/** Action type dispatched when the client wants to reset the change password request redux data. */
export const PASSWORD_CHANGE_RESET =
  '@farfetch/blackout-core/PASSWORD_CHANGE_RESET';

/** Action type dispatched when the recover password request fails. */
export const PASSWORD_RECOVER_FAILURE =
  '@farfetch/blackout-core/PASSWORD_RECOVER_FAILURE';
/** Action type dispatched when the recover password request starts. */
export const PASSWORD_RECOVER_REQUEST =
  '@farfetch/blackout-core/PASSWORD_RECOVER_REQUEST';
/** Action type dispatched when the recover password request succeeds. */
export const PASSWORD_RECOVER_SUCCESS =
  '@farfetch/blackout-core/PASSWORD_RECOVER_SUCCESS';
/** Action type dispatched when the client wants to reset the recover password request redux data. */
export const PASSWORD_RECOVER_RESET =
  '@farfetch/blackout-core/PASSWORD_RECOVER_RESET';

/** Action type dispatched when the reset password request fails. */
export const PASSWORD_RESET_FAILURE =
  '@farfetch/blackout-core/PASSWORD_RESET_FAILURE';
/** Action type dispatched when the reset password request starts. */
export const PASSWORD_RESET_REQUEST =
  '@farfetch/blackout-core/PASSWORD_RESET_REQUEST';
/** Action type dispatched when the reset password request succeeds. */
export const PASSWORD_RESET_SUCCESS =
  '@farfetch/blackout-core/PASSWORD_RESET_SUCCESS';
/** Action type dispatched when the client wants to reset the reset password request redux data. */
export const PASSWORD_RESET_RESET =
  '@farfetch/blackout-core/PASSWORD_RESET_RESET';

/** Action type dispatched when the register request fails. */
export const REGISTER_FAILURE = '@farfetch/blackout-core/REGISTER_FAILURE';
/** Action type dispatched when the register request starts. */
export const REGISTER_REQUEST = '@farfetch/blackout-core/REGISTER_REQUEST';
/** Action type dispatched when the register request succeeds. */
export const REGISTER_SUCCESS = '@farfetch/blackout-core/REGISTER_SUCCESS';
/** Action type dispatched when the client wants to reset the register request redux data. */
export const REGISTER_RESET = '@farfetch/blackout-core/REGISTER_RESET';

/** Action type dispatched when the validate email request fails. */
export const VALIDATE_EMAIL_FAILURE =
  '@farfetch/blackout-core/VALIDATE_EMAIL_FAILURE';
/** Action type dispatched when the validate email request starts. */
export const VALIDATE_EMAIL_REQUEST =
  '@farfetch/blackout-core/VALIDATE_EMAIL_REQUEST';
/** Action type dispatched when the validate email request succeeds. */
export const VALIDATE_EMAIL_SUCCESS =
  '@farfetch/blackout-core/VALIDATE_EMAIL_SUCCESS';
/** Action type dispatched when the client wants to reset the validate email request redux data. */
export const VALIDATE_EMAIL_RESET =
  '@farfetch/blackout-core/VALIDATE_EMAIL_RESET';

// TODO: Remove this acction type after v 2.0.0
/** Action type dispatched when the refresh token request fails. */
export const REFRESH_TOKEN_FAILURE =
  '@farfetch/blackout-core/REFRESH_TOKEN_FAILURE';
/** Action type dispatched when the refresh token request starts. */
export const REFRESH_TOKEN_REQUEST =
  '@farfetch/blackout-core/REFRESH_TOKEN_REQUEST';
/** Action type dispatched when the refresh token request succeeds. */
export const REFRESH_TOKEN_SUCCESS =
  '@farfetch/blackout-core/REFRESH_TOKEN_SUCCESS';
/** Action type dispatched when the client wants to reset the refreshtoken request redux data. */
export const REFRESH_TOKEN_RESET =
  '@farfetch/blackout-core/REFRESH_TOKEN_RESET';

/** Action type dispatched when the refresh email token request fails. */
export const REFRESH_EMAIL_TOKEN_FAILURE =
  '@farfetch/blackout-core/REFRESH_EMAIL_TOKEN_FAILURE';
/** Action type dispatched when the refresh email token request starts. */
export const REFRESH_EMAIL_TOKEN_REQUEST =
  '@farfetch/blackout-core/REFRESH_EMAIL_TOKEN_REQUEST';
/** Action type dispatched when the refresh email token request succeeds. */
export const REFRESH_EMAIL_TOKEN_SUCCESS =
  '@farfetch/blackout-core/REFRESH_EMAIL_TOKEN_SUCCESS';
/** Action type dispatched when the client wants to reset the refresh email token request redux data. */
export const REFRESH_EMAIL_TOKEN_RESET =
  '@farfetch/blackout-core/REFRESH_EMAIL_TOKEN_RESET';

/** Action type dispatched when the client wants to reset the token request redux data. */
export const AUTHENTICATION_RESET =
  '@farfetch/blackout-core/AUTHENTICATION_RESET';
