import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for retrieving an operation performed on the bag.
 *
 * @function getBagOperation
 * @memberof module:bags/client
 *
 * @param {string} id - Universal identifier of the bag.
 * @param {string} bagOperationId - Universal identifier of the bag operation.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (id, bagOperationId, config) =>
  client
    .get(join('/commerce/v1/bags', id, 'operations', bagOperationId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
