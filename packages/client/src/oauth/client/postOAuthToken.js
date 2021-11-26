import client, { adaptError } from '../../helpers/client';

/**
 * Gets the authentication token for the app, providing a simple way to manage
 * authorization and tokens.
 *
 * @function postOAuthToken
 * @memberof module:oauth/client
 *
 * @param {object} data - Parameteres to get the authentication token.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 *
 * @example
 * import client from '@farfetch/blackout-client/helpers/client';
 * import { postOAuthToken } from '@farfetch/blackout-client/oauth/client';
 *
 * client.defaults.baseURL = 'https://api.blackandwhite-ff.com';
 *
 * const auth = postOAuthToken({
 *     grant_type: 'client_credentials',
 *     client_id: CLIENT_ID,
 *     client_secret: CLIENT_SECRET,
 *     scope: 'api'
 * });
 *
 */
export default (data, config) =>
  client
    .post('/oauth/v1/connect/token', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
