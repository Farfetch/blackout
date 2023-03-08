import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetCheckoutOrderDeliveryBundleProvisioning } from './types/index.js';

/**
 * Obtains the item's provisioning for the specified bundle.
 *
 * @param checkoutOrderId  - Identifier of the checkout order.
 * @param deliveryBundleId - Identifier of the delivery bundle.
 * @param config           - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCheckoutOrderDeliveryBundleProvisioning: GetCheckoutOrderDeliveryBundleProvisioning =
  (checkoutOrderId, deliveryBundleId, config) =>
    client
      .get(
        join(
          '/checkout/v1/orders/',
          checkoutOrderId,
          'deliveryBundles/',
          deliveryBundleId,
          'itemDeliveryProvisioning',
        ),
        config,
      )
      .then(response => response.data)
      .catch(error => {
        throw adaptError(error);
      });

export default getCheckoutOrderDeliveryBundleProvisioning;
