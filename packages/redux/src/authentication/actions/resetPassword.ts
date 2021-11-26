import { postPasswordReset } from '@farfetch/blackout-client/authentication';
import { resetPasswordFactory } from './factories';

/**
 * Method responsible for resetting and setting a new password.
 *
 * @memberof module:authentication/actions
 *
 * @function resetPassword
 *
 * @type {ResetPasswordThunkFactory}
 */
export default resetPasswordFactory(postPasswordReset);
