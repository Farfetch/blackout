import { postTokens } from '@farfetch/blackout-client';
import { refreshTokenFactory } from './factories';

/**
 * Refreshes user or client's token.
 */
export default refreshTokenFactory(postTokens);
