import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import urlJoin from 'proper-url-join';
import type { GetCheckoutOrderDeliveryBundles } from './types/index.js';

/**
 * Obtains the delivery bundles available for the specified checkout order.
 *
 * @param checkoutOrderId  - Identifier of the checkout order.
 * @param config           - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCheckoutOrderDeliveryBundles: GetCheckoutOrderDeliveryBundles = (
  checkoutOrderId,
  config,
) =>
  client
    .get(
      urlJoin('/checkout/v1/orders/', checkoutOrderId, 'deliveryBundles'),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCheckoutOrderDeliveryBundles;
