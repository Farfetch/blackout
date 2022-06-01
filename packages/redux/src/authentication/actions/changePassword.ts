import { changePasswordFactory } from './factories';
import { postPasswordChange } from '@farfetch/blackout-client/authentication';

/**
 * Change the user's password.
 */
export default changePasswordFactory(postPasswordChange);
