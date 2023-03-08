import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { PutCheckoutOrderPromocode } from './types/index.js';

/**
 * Method responsible for adding promo code information.
 *
 * @param checkoutOrderId     - Universal identifier of the Checkout.
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const putCheckoutOrderPromocode: PutCheckoutOrderPromocode = (
  checkoutOrderId,
  data,
  config,
) =>
  client
    .put(
      join('/checkout/v1/orders/', checkoutOrderId, 'promocodes'),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default putCheckoutOrderPromocode;
