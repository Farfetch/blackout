import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import type { GetCheckoutOrderDeliveryBundleUpgrades } from './types/index.js';

/**
 * Obtains the delivery upgrades available for the specified bundle.
 *
 * @param checkoutOrderId  - Identifier of the checkout order.
 * @param deliveryBundleId - Identifier of the delivery bundle.
 * @param config           - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCheckoutOrderDeliveryBundleUpgrades: GetCheckoutOrderDeliveryBundleUpgrades =
  (checkoutOrderId, deliveryBundleId, config) =>
    client
      .get(
        `/checkout/v1/orders/${checkoutOrderId}/deliveryBundles/${deliveryBundleId}/upgrades`,
        config,
      )
      .then(response => response.data)
      .catch(error => {
        throw adaptError(error);
      });

export default getCheckoutOrderDeliveryBundleUpgrades;
