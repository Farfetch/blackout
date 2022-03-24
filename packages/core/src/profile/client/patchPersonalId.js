import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for updating a specific personal id.
 *
 * @function patchPersonalId
 * @memberof module:profile/client
 *
 * @param {number} userId - User identifier.
 * @param {string} personalId - Alphanumeric identifier of the personal id.
 * @param {object} data - Data to update a specific personal id.
 * @param {object} config - Custom configurations to send to the client
 * instance (axios). X-SUMMER-RequestId header is required.
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, personalId, data, config) =>
  client
    .patch(
      join('/account/v1/users', userId, 'personalIds/', personalId),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
