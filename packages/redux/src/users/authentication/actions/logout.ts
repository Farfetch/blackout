import { logoutFactory } from './factories/index.js';
import { postLogout } from '@farfetch/blackout-client';

/**
 * Performs logout operation for the user.
 */
export default logoutFactory(postLogout);
