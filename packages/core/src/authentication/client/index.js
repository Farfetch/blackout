/**
 * Authentication clients.
 *
 * @module authentication/client
 * @category Authentication
 * @subcategory Clients
 */

export { default as postLogin } from './postLogin';
export { default as postLogout } from './postLogout';
export { default as postPasswordChange } from './postPasswordChange';
export { default as postPasswordRecover } from './postPasswordRecover';
export { default as postPasswordReset } from './postPasswordReset';
export { default as postRefreshToken } from './postRefreshToken';
export { default as postRefreshEmailToken } from './postRefreshEmailToken';
export { default as postRegister } from './postRegister';
export { default as postValidateEmail } from './postValidateEmail';
export { default as postUserToken } from './postUserToken';
export { default as postGuestTokens } from './postGuestTokens';
export { default as postTokens } from './postTokens';
export { default as deleteUserToken } from './deleteUserToken';
export { default as deleteGuestTokens } from './deleteGuestTokens';
export { default as deleteTokens } from './deleteTokens';
