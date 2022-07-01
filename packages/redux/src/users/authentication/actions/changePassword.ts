import { changePasswordFactory } from './factories';
import { postPasswordChange } from '@farfetch/blackout-client';

/**
 * Change the user's password.
 */
export default changePasswordFactory(postPasswordChange);
