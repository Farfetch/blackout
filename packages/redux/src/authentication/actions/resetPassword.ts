import { postPasswordReset } from '@farfetch/blackout-client/authentication';
import { resetPasswordFactory } from './factories';

/**
 * Method responsible for resetting and setting a new password.
 */
export default resetPasswordFactory(postPasswordReset);
