import { createClientCredentialsTokenFactory } from './factories';
import { postTokens } from '@farfetch/blackout-client';

/**
 * Creates client credentials token.
 */
export default createClientCredentialsTokenFactory(postTokens);
