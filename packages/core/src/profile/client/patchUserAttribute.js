import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} UserAttributeData
 *
 * @alias UserAttributeData
 * @memberof module:profile/client
 *
 * @property {string} op - Type of operation, i.e replace.
 * @property {string} path - Path of the value to change.
 * @property {string} value - New value.
 */

/**
 * Method responsible for updating specific user attribute.
 *
 * @function patchUserAttribute
 * @memberof module:profile/client
 *
 * @param {number} userId - User's id to be filtered for.
 * @param {string} attributeId - The attribute id to be filtered for.
 * @param {UserAttributeData[]} data - User attribute data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, attributeId, data, config) =>
  client
    .patch(
      join('/account/v1/users/', userId, '/attributes', attributeId),
      data,
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });
