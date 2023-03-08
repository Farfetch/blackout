import { createUserTokenFactory } from './factories/index.js';
import { postToken } from '@farfetch/blackout-client';

/**
 * Creates a user token.
 */
export default createUserTokenFactory(postToken);
