import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import urlJoin from 'proper-url-join';
import type { DeleteCheckoutOrderPromocodes } from './types/deleteCheckoutOrderPromocodes.types.js';

/**
 * Method responsible for deleting the previously applied promocode from the order
 *
 * @param checkoutOrderId - Universal identifier of the checkout order.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deleteCheckoutOrderPromocodes: DeleteCheckoutOrderPromocodes = (
  checkoutOrderId,
  config,
) =>
  client
    .delete(
      urlJoin('/checkout/v1/orders/', checkoutOrderId, 'promocodes'),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteCheckoutOrderPromocodes;
