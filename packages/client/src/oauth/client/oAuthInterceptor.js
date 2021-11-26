import tokenProvider from 'axios-token-interceptor';

/**
 * Handle refresh token and inject the Authorization header on all requests.
 *
 * @function oAuthInterceptor
 * @memberof module:oauth/client
 *
 * @param {Function} fetchToken - Allows to fetch the authentication token
 * for the app.
 *
 * @returns {object} Options with the request headers and tokens to be used by
 * axios.interceptors.request.
 *
 * @example
 * import client from '@farfetch/blackout-client/helpers/client';
 * import { oAuthInterceptor, postOAuthToken } from '@farfetch/blackout-client/oauth/client';
 *
 * const fetchToken = () => postOAuthToken({
 *     grant_type: 'client_credentials',
 *     client_id: CLIENT_ID,
 *     client_secret: CLIENT_SECRET,
 *     scope: 'api'
 * });
 *
 * client.defaults.baseURL = 'https://api.blackandwhite-ff.com';
 * client.interceptors.request.use(oAuthInterceptor(fetchToken));
 */
export default fetchToken => {
  // Get the token with cache, to work as long as the token is valid. In this
  // case, the token contains the expiration time (expires_in) and we use this
  // to configure the maximum age of the cache.
  // Note that expires_in coming from your authorization server is expressed
  // in seconds, so you'll need to convert it to milliseconds when returning
  // it to the getMaxAge function.
  const getToken = tokenProvider.tokenCache(fetchToken, {
    getMaxAge: token => token.expires_in * 1000,
  });
  const headerFormatter = token => `Bearer ${token.access_token}`;

  // The tokenProvider will manage the expiration time of our token and
  // provide a new one when necessary.
  return tokenProvider({ getToken, headerFormatter });
};
