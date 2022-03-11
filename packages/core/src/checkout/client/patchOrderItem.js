import client, { adaptError } from '../../helpers/client';

/**
 * Applies updates to order item.
 *
 * @function patchOrderItem
 * @memberof module:checkout/client
 * @param {string} id - Identifier of the checkout order.
 * @param {string} itemId - Identifier of the order item.
 * @param {object} orderItemUpdateData - Data to update order item
 * For example { "quantity": 2 } to update order item quantity.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, itemId, orderItemUpdateData, config) =>
  client
    .patch(
      `/checkout/v1/orders/${id}/items/${itemId}`,
      orderItemUpdateData,
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });
