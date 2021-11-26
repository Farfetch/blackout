import { changePasswordFactory } from './factories';
import { postPasswordChange } from '@farfetch/blackout-client/authentication';

/**
 * Change the user's password.
 *
 * @memberof module:authentication/actions
 *
 * @function changePassword
 *
 * @type {PostTokensCredentialThunkFactory}
 */
export default changePasswordFactory(postPasswordChange);
