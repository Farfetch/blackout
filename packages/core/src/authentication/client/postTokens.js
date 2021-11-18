import client, {
  adaptError,
  configApiBlackAndWhite,
} from '../../helpers/client';

/**
 * @typedef {object} PostTokensData
 *
 * @alias PostTokensData
 * @memberof module:authentication/client
 *
 * @property {string} username -  The user name.
 * @property {string} password -  The password.
 * @property {string} grantType -  The grant type. Possible values: ['password', 'refresh_token', 'client_credentials'].
 * @property {string} refreshToken -  The refresh token.
 */

/**
 * Method responsible for managing authentications.
 *
 * @function postTokens
 * @memberof module:authentication/client
 *
 * @param {PostTokensData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, config = configApiBlackAndWhite) =>
  client
    .post('/authentication/v1/tokens', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
