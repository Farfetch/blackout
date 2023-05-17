import { loginFactory } from './factories/index.js';
import { postLogin } from '@farfetch/blackout-client';

/**
 * Performs login operation for the user.
 */
export default loginFactory(postLogin);
