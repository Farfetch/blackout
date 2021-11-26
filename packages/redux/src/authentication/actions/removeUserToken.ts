import { deleteTokens } from '@farfetch/blackout-client/authentication';
import { removeUserTokenFactory } from './factories';

/**
 * Deletes a user or client's token.
 *
 * @memberof module:authentication/actions
 *
 * @function removeToken
 *
 * @type {DeleteTokenThunkFactory}
 */
export default removeUserTokenFactory(deleteTokens);
