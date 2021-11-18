import client, { adaptError } from '../../helpers/client';

/**
 * @typedef {object} PostPasswordChangeData
 *
 * @alias PostPasswordChangeData
 * @memberof module:authentication/client
 *
 * @property {string} oldPassword - Old Password.
 * @property {string} newPassword - New Password.
 * @property {string} userId - User's identifier.
 * @property {string} username - User's email.
 */

/**
 * Method responsible for changing a user password.
 *
 * @function postPasswordChange
 * @memberof module:authentication/client
 *
 * @param {PostPasswordChangeData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, config) => {
  // The `userId` property was previously mandatory, but just to make sure it's
  // available, we double-check
  const includesUserId = !!data?.userId;
  const url = includesUserId
    ? `/account/v1/users/${data.userId}/passwordchange`
    : '/legacy/v1/account/password/change';

  return client.post(url, data, config).catch(error => {
    throw adaptError(error);
  });
};
