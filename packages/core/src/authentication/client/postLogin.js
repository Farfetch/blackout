import client, { adaptError } from '../../helpers/client';

/**
 * @typedef {object} PostLoginData
 *
 * @alias PostLoginData
 * @memberof module:authentication/client
 *
 * @property {string} username - User's email.
 * @property {string} password - User's password.
 * @property {boolean} [rememberMe] - If should remember user details.
 */

/**
 * Method responsible for logging in a user.
 *
 * @function postLogin
 * @memberof module:authentication/client
 *
 * @param {PostLoginData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, config) =>
  client
    .post('/legacy/v1/account/login', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
