import client, { adaptError } from '../helpers/client';

/**
 * Method responsible for validating the user's e-mail, activating the account.
 *
 * @function postValidateEmail
 * @memberof module:authentication/client
 * @param {PostValidateEmailData} data - Request data.
 * @param {string} data.username - User's email.
 * @param {string} data.token - User's validation token.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (
  data: {
    username: string;
    token: string;
  },
  config?: { [k: string]: any },
): Promise<any> =>
  client
    .post('/account/v1/emailtokensvalidation', data, config)
    .catch(error => {
      throw adaptError(error);
    });
