import client, { adaptError } from '../helpers/client';

/**
 * Method responsible for changing a user password.
 *
 * @function postPasswordChange
 * @memberof module:authentication/client
 * @param {object} data - Request data.
 * @param {string} data.oldPassword - Old Password.
 * @param {string} data.newPassword - New Password.
 * @param {number} data.userId - User's identifier.
 * @param {string} data.username - User's email.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (
  data: {
    oldPassword: string;
    newPassword: string;
    userId: number;
    username: string;
  },
  config?: { [k: string]: any },
): Promise<any> =>
  client
    .post(`/account/v1/users/${data.userId}/passwordchange`, data, config)
    .catch(error => {
      throw adaptError(error);
    });
