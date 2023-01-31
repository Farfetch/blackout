import client, { adaptError } from '../../helpers/client';

/**
 * @typedef {object} PostValidateEmailData
 *
 * @alias PostValidateEmailData
 * @memberof module:authentication/client
 *
 * @property {string} username - User's email.
 * @property {string} token - User's validation token.
 */

/**
 * Method responsible for validating the user's e-mail, activating the account.
 *
 * @function postValidateEmail
 * @memberof module:authentication/client
 *
 * @param {PostValidateEmailData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, config) =>
  client
    .post('/account/v1/emailtokensvalidation', data, config)
    .catch(error => {
      throw adaptError(error);
    });
