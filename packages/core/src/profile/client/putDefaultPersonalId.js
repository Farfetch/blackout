import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for updating a default personal id.
 *
 * @function putDefaultPersonalId
 * @memberof module:profile/client
 *
 * @param {number} userId - Universal identifier of the user.
 * @param {object} data - Object containing personal id data.
 * @param {object} config - Custom configurations to send to the client
 * instance (axios). X-SUMMER-RequestId header is required.
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, data, config) =>
  client
    .put(
      join('/account/v1/users/', userId, '/personalIds/default'),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
