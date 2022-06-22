import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PutCheckoutOrderPromocode } from './types';

/**
 * Method responsible for adding promo code information.
 *
 * @param id     - Universal identifier of the Checkout.
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const putCheckoutOrderPromocode: PutCheckoutOrderPromocode = (
  id,
  data,
  config,
) =>
  client
    .put(join('/checkout/v1/orders/', id, 'promocodes'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
