import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import type { GetCheckoutOrderDeliveryBundleUpgradeProvisioning } from './types/index.js';

/**
 * Obtains the items delivery provisioning available for a upgrade.
 *
 * @param checkoutOrderId  - Identifier of the checkout order.
 * @param deliveryBundleId - Identifier of the delivery bundle.
 * @param upgradeId        - Identifier of the upgrade.
 * @param config           - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCheckoutOrderDeliveryBundleUpgradeProvisioning: GetCheckoutOrderDeliveryBundleUpgradeProvisioning =
  (checkoutOrderId, deliveryBundleId, upgradeId, config) =>
    client
      .get(
        `/checkout/v1/orders/${checkoutOrderId}/deliveryBundles/${deliveryBundleId}/upgrades/${upgradeId}/itemDeliveryProvisioning`,
        config,
      )
      .then(response => response.data)
      .catch(error => {
        throw adaptError(error);
      });

export default getCheckoutOrderDeliveryBundleUpgradeProvisioning;
