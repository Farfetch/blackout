import { deleteToken } from '@farfetch/blackout-client';
import { removeUserTokenFactory } from './factories';

/**
 * Deletes a user or client's token.
 */
export default removeUserTokenFactory(deleteToken);
