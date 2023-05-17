import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { PutCheckoutOrderPromocodes } from './types/index.js';

/**
 * Method responsible for adding promo code information.
 * Important: Right now, only one promo code can be set to a checkout order.
 *
 * @param checkoutOrderId - Universal identifier of the Checkout.
 * @param data            - Request data.
 * @param config          - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const putCheckoutOrderPromocodes: PutCheckoutOrderPromocodes = (
  checkoutOrderId,
  data,
  config,
) => {
  // IMPORTANT: We are adding the `promocode` property alongside the `promocodes`
  // since the legacy service only accepts one promocode through the `promocode` property
  // and discards everything else. The new service will look to both properties,
  // giving priority to `promocodes` which can be an array.
  const promocodesData = {
    ...data,
    promocode: data.promocodes[0] ?? '',
  };

  return client
    .put(
      join('/checkout/v1/orders/', checkoutOrderId, 'promocodes'),
      promocodesData,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};

export default putCheckoutOrderPromocodes;
