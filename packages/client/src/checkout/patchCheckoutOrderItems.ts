import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { PatchCheckoutOrderItems } from './types';

/**
 * Method responsible for adding, editing and removing gift messages to the current
 * checkout order.
 *
 * @param id     - Universal identifier of the Checkout.
 * @param data   - Array of objects containing the checkout order id and the checkout item patch
 *                 document reflecting the changes to be made.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const patchCheckoutOrderItems: PatchCheckoutOrderItems = (id, data, config) =>
  client
    .patch(join('/checkout/v1/orders/', id, 'items'), data, config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default patchCheckoutOrderItems;
