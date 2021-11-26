import client, { adaptError } from '../helpers/client';

/**
 * Resets the user password with the new password.
 *
 * @function postPasswordReset
 * @memberof module:authentication/client
 * @param {object} data - Request data.
 * @param {string} data.username - User's email.
 * @param {string} data.token - Reset password token.
 * @param {string} data.password - User's new password.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (
  data: {
    username: string;
    token: string;
    password: string;
  },
  config?: { [k: string]: any },
): Promise<any> =>
  client.post('/account/v1/users/passwordreset', data, config).catch(error => {
    throw adaptError(error);
  });
