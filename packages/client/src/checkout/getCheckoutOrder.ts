import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetCheckoutOrder } from './types/index.js';

/**
 * Method responsible for loading the checkout.
 *
 * @param checkoutOrderId - Universal identifier of the Checkout.
 * @param query           - Query param "fields" with search criteria for getting the order.
 *                          Possible values (string comma separated):
 *                            - checkoutOrder
 *                            - paymentMethods
 *                            - shippingOptions
 *                            - deliveryBundles
 *                            - userPaymentTokens
 * @param config       - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCheckoutOrder: GetCheckoutOrder = (checkoutOrderId, query, config) =>
  client
    .get(join('/checkout/v1/orders/', checkoutOrderId, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCheckoutOrder;
