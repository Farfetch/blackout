import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetCheckoutOrderDetails } from './types/index.js';

/**
 * Method responsible for loading the checkout details. These are used for the
 * order confirmation.
 *
 * @param checkoutOrderId - Universal identifier of the Checkout.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCheckoutOrderDetails: GetCheckoutOrderDetails = (
  checkoutOrderId,
  config,
) =>
  client
    .get(join('/checkout/v1/orders/', checkoutOrderId, 'details'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCheckoutOrderDetails;
