import { changePasswordFactory } from './factories/index.js';
import { postPasswordChange } from '@farfetch/blackout-client';

/**
 * Change the user's password.
 */
export default changePasswordFactory(postPasswordChange);
