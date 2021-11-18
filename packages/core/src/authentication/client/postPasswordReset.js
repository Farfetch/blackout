import client, { adaptError } from '../../helpers/client';

/**
 * @typedef {object} PostPasswordResetData
 *
 * @alias PostPasswordResetData
 * @memberof module:authentication/client
 *
 * @property {string} username - User's email.
 * @property {string} token - Reset password token.
 * @property {string} password - User's new password.
 */

/**
 * Resets the user password with the new password.
 *
 * @function postPasswordReset
 * @memberof module:authentication/client
 *
 * @param {PostPasswordResetData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, config) =>
  client.post('/account/v1/users/passwordreset', data, config).catch(error => {
    throw adaptError(error);
  });
