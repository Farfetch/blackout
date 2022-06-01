import { createUserTokenFactory } from './factories';
import { postTokens } from '@farfetch/blackout-client/authentication';

/**
 * Creates a user token.
 */
export default createUserTokenFactory(postTokens);
