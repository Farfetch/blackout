import client, { adaptError } from '../../helpers/client';

/**
 * Deletes order item.
 *
 * @function deleteOrderItem
 * @memberof module:checkout/client
 * @param {string} id - Identifier of the checkout order.
 * @param {string} itemId - Identifier of the order item.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, itemId, config) =>
  client
    .delete(`/checkout/v1/orders/${id}/items/${itemId}`, config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });
