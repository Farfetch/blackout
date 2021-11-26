import { createClientCredentialsTokenFactory } from './factories';
import { postTokens } from '@farfetch/blackout-client/authentication';

/**
 * Creates client credentials token.
 *
 * @memberof module:authentication/actions
 *
 * @function createClientCredentials
 *
 * @type {PostTokensCredentialThunkFactory}
 */
export default createClientCredentialsTokenFactory(postTokens);
