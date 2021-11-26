import client, { adaptError } from '../helpers/client';

/**
 * Method responsible for sending an email for the user to reset the password.
 *
 * @function postPasswordRecover
 * @memberof module:authentication/client
 * @param {object} data - Request data.
 * @param {string} data.username - User's email.
 * @param {string} uri - URI where the user will reset its password.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (
  data: {
    username: string;
  },
  config?: { [k: string]: any },
): Promise<any> =>
  client
    .post('/account/v1/users/passwordrecover', data, config)
    .catch(error => {
      throw adaptError(error);
    });
