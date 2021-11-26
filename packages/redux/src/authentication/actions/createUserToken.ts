import { createUserTokenFactory } from './factories';
import { postTokens } from '@farfetch/blackout-client/authentication';

/**
 * Creates a user token.
 *
 * @memberof module:authentication/actions
 *
 * @name createUserToken
 *
 * @type {PostTokensThunkFactory}
 */
export default createUserTokenFactory(postTokens);
