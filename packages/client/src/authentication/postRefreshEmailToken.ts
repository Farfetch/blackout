import client, { adaptError } from '../helpers/client';

/**
 * Refreshes the user's validation email token.
 * To be used when the user went past the email token's expiration date or
 * there was other kind of error validation the user's email.
 *
 * @function postRefreshEmailToken
 * @memberof module:authentication/client
 * @param {object} data - Request data.
 * @param {string} data.username - User's email.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (
  data: { username: string },
  config?: { [k: string]: any },
): Promise<any> =>
  client.post('/account/v1/emailtokens', data, config).catch(error => {
    throw adaptError(error);
  });
