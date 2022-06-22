import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetCheckoutOrderOperations } from './types/getCheckoutOrderOperations.types';

/**
 * Method responsible for fetching all operations performed in the order.
 *
 * @param id     - Universal identifier of the Order.
 * @param query  - Query params.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const getCheckoutOrderOperations: GetCheckoutOrderOperations = (
  id,
  query,
  config,
) =>
  client
    .get(join('/checkout/v1/orders/', id, 'operations', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
