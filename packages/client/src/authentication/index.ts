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
export { default as postRefreshEmailToken } from './postRefreshEmailToken';
export { default as postRegister } from './postRegister';
export { default as postValidateEmail } from './postValidateEmail';
export { default as deleteUserImpersonation } from './deleteUserImpersonation';
export { default as postUserImpersonation } from './postUserImpersonation';
export { default as postGuestTokens } from './postGuestTokens';
export { default as postTokens } from './postTokens';
export { default as deleteGuestTokens } from './deleteGuestTokens';
export { default as deleteTokens } from './deleteTokens';
