import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { PutCheckoutOrderTags } from './types';

/**
 * Method responsible for adding tags information.
 *
 * @param checkoutOrderId     - Universal identifier of the Checkout.
 * @param data   - Array of strings representing the tags you want to add.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const putCheckoutOrderTags: PutCheckoutOrderTags = (
  checkoutOrderId,
  data,
  config,
) =>
  client
    .put(join('/checkout/v1/orders/', checkoutOrderId, 'tags'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default putCheckoutOrderTags;
