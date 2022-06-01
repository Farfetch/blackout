import { postTokens } from '@farfetch/blackout-client/authentication';
import { refreshTokenFactory } from './factories';

/**
 * Refreshes user or client's token.
 */
export default refreshTokenFactory(postTokens);
