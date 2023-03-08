import { createClientCredentialsTokenFactory } from './factories/index.js';
import { postToken } from '@farfetch/blackout-client';

/**
 * Creates client credentials token.
 */
export default createClientCredentialsTokenFactory(postToken);
