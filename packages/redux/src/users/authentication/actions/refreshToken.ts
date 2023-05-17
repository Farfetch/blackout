import { postToken } from '@farfetch/blackout-client';
import { refreshTokenFactory } from './factories/index.js';

/**
 * Refreshes user or client's token.
 */
export default refreshTokenFactory(postToken);
