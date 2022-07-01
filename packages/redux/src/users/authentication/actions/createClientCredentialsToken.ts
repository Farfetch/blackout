import { createClientCredentialsTokenFactory } from './factories';
import { postToken } from '@farfetch/blackout-client';

/**
 * Creates client credentials token.
 */
export default createClientCredentialsTokenFactory(postToken);
