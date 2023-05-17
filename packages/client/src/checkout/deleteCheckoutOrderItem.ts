import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import urlJoin from 'proper-url-join';
import type { DeleteCheckoutOrderItem } from './types/deleteCheckoutOrderItem.types.js';

/**
 * Method responsible for deleting a checkout order item
 *
 * @param checkoutOrderId - Universal identifier of the checkout order.
 * @param itemId - Checkout order item identifier.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deleteCheckoutOrderItem: DeleteCheckoutOrderItem = (
  checkoutOrderId,
  itemId,
  config,
) =>
  client
    .delete(
      urlJoin('/checkout/v1/orders/', checkoutOrderId, 'items', itemId),
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteCheckoutOrderItem;
