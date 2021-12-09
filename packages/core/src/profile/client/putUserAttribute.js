import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for updating specific user attribute.
 *
 * @function putUserAttribute
 * @memberof module:profile/client
 *
 * @param {number} userId - User's id to be filtered for.
 * @param {string} attributeId - The attribute id to be filtered for.
 * @param {object} data - User attribute data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, attributeId, data, config) =>
  client
    .put(
      join('/account/v1/users/', userId, '/attributes', attributeId),
      data,
      config,
    )
    .catch(error => {
      throw adaptError(error);
    });
