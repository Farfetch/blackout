import { postPasswordReset } from '@farfetch/blackout-client';
import { resetPasswordFactory } from './factories/index.js';

/**
 * Method responsible for resetting and setting a new password.
 */
export default resetPasswordFactory(postPasswordReset);
