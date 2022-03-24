import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for deleting a personal id.
 *
 * @function deletePersonalId
 * @memberof module:profile/client
 *
 * @param {number} userId - The user's id.
 * @param {string} personalId - Alphanumeric identifier of the personal id.
 * @param {object} config - Custom configurations to send to the client
 * instance (axios). X-SUMMER-RequestId header is required.
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, personalId, config) =>
  client
    .delete(
      join('/account/v1/users', userId, 'personalIds/', personalId),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
