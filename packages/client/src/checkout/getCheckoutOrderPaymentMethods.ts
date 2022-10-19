import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetCheckoutOrderPaymentMethods } from './types';

/**
 * Method responsible for fetching the available payment methods for a checkout order.
 *
 * @param checkoutOrderId - Universal identifier of the order.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCheckoutOrderPaymentMethods: GetCheckoutOrderPaymentMethods = (
  checkoutOrderId,
  config,
) =>
  client
    .get(
      join('/checkout/v1/orders', checkoutOrderId, {
        query: {
          fields: 'paymentMethods',
        },
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCheckoutOrderPaymentMethods;
