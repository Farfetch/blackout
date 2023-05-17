import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetCheckoutOrderOperations } from './types/getCheckoutOrderOperations.types.js';

/**
 * Method responsible for fetching all operations performed in the order.
 *
 * @param checkoutOrderId - Universal identifier of the Order.
 * @param query  - Query params.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCheckoutOrderOperations: GetCheckoutOrderOperations = (
  checkoutOrderId,
  query,
  config,
) =>
  client
    .get(
      join('/checkout/v1/orders/', checkoutOrderId, 'operations', { query }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCheckoutOrderOperations;
