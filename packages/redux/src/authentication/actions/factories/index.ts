/**
 * Authentication action factories.
 *
 * @module authentication/actions/factories
 * @category Authentication
 * @subcategory Actions
 */
export { default as loginFactory } from './loginFactory';
export { default as logoutFactory } from './logoutFactory';
export { default as registerFactory } from './registerFactory';
export { default as changePasswordFactory } from './changePasswordFactory';
export { default as recoverPasswordFactory } from './recoverPasswordFactory';
export { default as resetPasswordFactory } from './resetPasswordFactory';
export { default as refreshEmailTokenFactory } from './refreshEmailTokenFactory';
export { default as validateEmailFactory } from './validateEmailFactory';
export { default as createClientCredentialsTokenFactory } from './createClientCredentialsTokenFactory';
export { default as refreshTokenFactory } from './refreshTokenFactory';
export { default as createUserTokenFactory } from './createUserTokenFactory';
export { default as removeUserTokenFactory } from './removeUserTokenFactory';
export { default as createUserImpersonationFactory } from './createUserImpersonationFactory';
export { default as removeUserImpersonationFactory } from './removeUserImpersonationFactory';
