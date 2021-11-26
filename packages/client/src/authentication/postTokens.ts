import client, { adaptError, configApiBlackAndWhite } from '../helpers/client';

/**
 * Method responsible for managing authentications.
 *
 * @function postTokens
 * @memberof module:authentication/client
 * @param {object} data - Request data.
 * @param {string} data.username -  The user name.
 * @param {string} data.password -  The password.
 * @param {string} data.grantType - The grant type. Possible values: ['password', 'refresh_token', 'client_credentials'].
 * @param {string} data.refreshToken -  The refresh token.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (
  data: {
    username: string;
    password: string;
    grantType: string;
    refreshToken: string;
  },
  config: { [k: string]: any } = configApiBlackAndWhite,
): Promise<any> =>
  client
    .post('/authentication/v1/tokens', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
