import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { PatchCheckoutOrderItems } from './types/index.js';

/**
 * Method responsible for adding, editing and removing gift messages to the current
 * checkout order.
 *
 * @param checkoutOrderId - Universal identifier of the Checkout.
 * @param data   - Array of objects containing the checkout order id and the checkout item patch
 *                 document reflecting the changes to be made.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const patchCheckoutOrderItems: PatchCheckoutOrderItems = (
  checkoutOrderId,
  data,
  config,
) =>
  client
    .patch(join('/checkout/v1/orders/', checkoutOrderId, 'items'), data, config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default patchCheckoutOrderItems;
