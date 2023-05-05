import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetCheckoutOrderContext } from './types/index.js';

/**
 * Method responsible for getting the order context.
 *
 * @param checkoutOrderId - Universal identifier of the Checkout.
 * @param contextId - Id of the checkout order context.
 * @param config          - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCheckoutOrderContext: GetCheckoutOrderContext = (
  checkoutOrderId,
  contextId,
  config,
) =>
  client
    .get(
      join('/checkout/v1/orders', checkoutOrderId, 'contexts', contextId),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCheckoutOrderContext;
