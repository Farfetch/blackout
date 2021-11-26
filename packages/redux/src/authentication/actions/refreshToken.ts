import { postTokens } from '@farfetch/blackout-client/authentication';
import { refreshTokenFactory } from './factories';

/**
 * Refreshes user or client's token.
 *
 * @memberof module:authentication/actions
 *
 * @function refreshToken
 *
 * @type {PostTokensRefreshThunkFactory}
 */
export default refreshTokenFactory(postTokens);
