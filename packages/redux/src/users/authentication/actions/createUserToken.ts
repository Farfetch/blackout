import { createUserTokenFactory } from './factories';
import { postToken } from '@farfetch/blackout-client';

/**
 * Creates a user token.
 */
export default createUserTokenFactory(postToken);
