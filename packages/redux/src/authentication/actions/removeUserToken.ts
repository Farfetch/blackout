import { deleteTokens } from '@farfetch/blackout-client/authentication';
import { removeUserTokenFactory } from './factories';

/**
 * Deletes a user or client's token.
 */
export default removeUserTokenFactory(deleteTokens);
