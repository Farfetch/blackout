import { deleteToken } from '@farfetch/blackout-client';
import { removeUserTokenFactory } from './factories/index.js';

/**
 * Deletes a user or client's token.
 */
export default removeUserTokenFactory(deleteToken);
