import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetPaymentMethods } from './types';

/**
 * Method responsible for fetching the available payment methods.
 *
 * @param id     - Universal identifier of the order.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getPaymentMethods: GetPaymentMethods = (id, config) =>
  client
    .get(
      join('/checkout/v1/orders', id, {
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

export default getPaymentMethods;
