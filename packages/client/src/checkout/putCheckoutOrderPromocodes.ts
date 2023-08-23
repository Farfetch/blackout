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
  // IMPORTANT: We are adding the `promocodes` property alongside the `promocode`
  // For now the service only accepts one promocode through the `promocode` property
  // and discards everything else. In the future the service will look to both properties,
  // giving priority to `promocodes` which can be an array.
  let promocodesData = {};

  // For now, we are giving priority to `promocode` since is the only
  // supported by the API for now
  if (data.promocode) {
    promocodesData = {
      ...data,
      promocodes: [data.promocode],
    };
  } else if (data.promocodes?.length) {
    promocodesData = {
      ...data,
      promocode: data.promocodes[0],
    };
  }

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
