import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { DeleteCheckoutOrderContext } from './types/index.js';

/**
 * Method responsible for deleting a order context.
 *
 * @param checkoutOrderId - Numeric identifier of the checkout order.
 * @param contextId - Id of the checkout order context.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deleteCheckoutOrderContext: DeleteCheckoutOrderContext = (
  checkoutOrderId,
  contextId,
  config,
) =>
  client
    .delete(
      join('/checkout/v1/orders', checkoutOrderId, 'contexts', contextId),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteCheckoutOrderContext;
