import { postRefreshEmailToken } from '@farfetch/blackout-client/authentication';
import { refreshEmailTokenFactory } from './factories';

/**
 * Refreshes the user's validation token.
 * To be used when the user went past the token's expiration date or
 * there was other kind of error validation the user's email.
 *
 * @memberof module:authentication/actions
 *
 * @function refreshEmailToken
 *
 * @type {RefreshEmailTokenThunkFactory}
 */
export default refreshEmailTokenFactory(postRefreshEmailToken);
