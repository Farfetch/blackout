import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for deleting specific user attribute.
 *
 * @function deleteUserAttribute
 * @memberof module:profile/client
 *
 * @param {number} userId - User's id to be filtered for.
 * @param {string} attributeId - The attribute id to be filtered for.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, attributeId, config) =>
  client
    .delete(
      join('/account/v1/users/', userId, '/attributes', attributeId),
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });
