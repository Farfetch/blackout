import { createClientCredentialsTokenFactory } from './factories';
import { postTokens } from '@farfetch/blackout-client/authentication';

/**
 * Creates client credentials token.
 */
export default createClientCredentialsTokenFactory(postTokens);
