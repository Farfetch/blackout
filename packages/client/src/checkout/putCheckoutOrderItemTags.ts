import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { PutCheckoutOrderItemTags } from './types';

/**
 * Method responsible for updating the checkout item tags.
 *
 * @param checkoutOrderId - Universal identifier of the Checkout.
 * @param itemId - Universal identifier of the Item.
 * @param data   - Array of strings representing the tags that you want to persist and/or add.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const putCheckoutOrderItemTags: PutCheckoutOrderItemTags = (
  checkoutOrderId,
  itemId,
  data,
  config,
) => {
  return client
    .put(
      join('/checkout/v1/orders/', checkoutOrderId, 'items', itemId, 'tags'),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};

export default putCheckoutOrderItemTags;
