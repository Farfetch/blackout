import client, { adaptError } from '../helpers/client';

/**
 * Method responsible for logging in a user.
 *
 * @function postLogin
 * @memberof module:authentication/client
 * @param {object} data - Request data.
 * @param {string} data.username - User's email.
 * @param {string} data.password - User's password.
 * @param {boolean} [data.rememberme] - If should remember user details.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (
  data: {
    username: string;
    password: string;
    rememberme?: boolean;
  },
  config?: { [k: string]: any },
): Promise<any> =>
  client
    .post('/legacy/v1/account/login', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
