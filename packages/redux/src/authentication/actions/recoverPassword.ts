import { postPasswordRecover } from '@farfetch/blackout-client/authentication';
import { recoverPasswordFactory } from './factories';

/**
 * Method responsible for sending an email for the user to reset the password.
 */
export default recoverPasswordFactory(postPasswordRecover);
