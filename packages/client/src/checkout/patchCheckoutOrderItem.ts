import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import urlJoin from 'proper-url-join';
import type { PatchCheckoutOrderItem } from './types/patchCheckoutOrderItem.types.js';

/**
 * Method responsible for updating a checkout order item
 *
 * @remarks
 *
 * Notes:
 * - Currently only supports the order item quantity update.
 *
 * @param checkoutOrderId - Universal identifier of the checkout order.
 * @param itemId - Checkout order item identifier.
 * @param data - Order item properties to update
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const patchCheckoutOrderItem: PatchCheckoutOrderItem = (
  checkoutOrderId,
  itemId,
  data,
  config,
) =>
  client
    .patch(
      urlJoin('/checkout/v1/orders/', checkoutOrderId, 'items', itemId),
      data,
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default patchCheckoutOrderItem;
