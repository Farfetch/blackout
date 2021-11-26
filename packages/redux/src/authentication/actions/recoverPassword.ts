import { postPasswordRecover } from '@farfetch/blackout-client/authentication';
import { recoverPasswordFactory } from './factories';

/**
 * Method responsible for sending an email for the user to reset the password.
 *
 * @memberof module:authentication/actions
 *
 * @function recoverPassword
 *
 * @type {PasswordRecoveryThunkFactory}
 */
export default recoverPasswordFactory(postPasswordRecover);
