import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetCheckoutOrderContexts } from './types/index.js';

/**
 * Method responsible for getting the order contexts.
 *
 * @param checkoutOrderId - Universal identifier of the Checkout.
 * @param config          - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCheckoutOrderContexts: GetCheckoutOrderContexts = (
  checkoutOrderId,
  config,
) =>
  client
    .get(join('/checkout/v1/orders', checkoutOrderId, 'contexts'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCheckoutOrderContexts;
