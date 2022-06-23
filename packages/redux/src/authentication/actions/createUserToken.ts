import { createUserTokenFactory } from './factories';
import { postTokens } from '@farfetch/blackout-client';

/**
 * Creates a user token.
 */
export default createUserTokenFactory(postTokens);
