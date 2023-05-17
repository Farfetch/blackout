import { deleteToken } from '@farfetch/blackout-client';
import { removeTokenFactory } from './factories/index.js';

/**
 * Removes a user or client credentials token.
 */
export default removeTokenFactory(deleteToken);
