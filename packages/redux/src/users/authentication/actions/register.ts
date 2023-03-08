import { postUser } from '@farfetch/blackout-client';
import { registerFactory } from './factories/index.js';

/**
 * Performs the register operation for a new user.
 */
export default registerFactory(postUser);
