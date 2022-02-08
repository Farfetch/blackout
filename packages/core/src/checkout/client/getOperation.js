import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for getting all the changes that occurred during the operation.
 *
 * @function getOperation
 * @memberof module:checkout/client
 *
 * @param {string} id - Numeric identifier of the checkout order.
 * @param {string} operationId - Numeric identifier of the operation.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, operationId, config) =>
  client
    .get(join('/checkout/v1/orders/', id, 'operations/', operationId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
