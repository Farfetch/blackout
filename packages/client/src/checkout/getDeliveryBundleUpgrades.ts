import client, { adaptError } from '../helpers/client';
import type { GetDeliveryBundleUpgrades } from './types';
/**
 * Obtains the delivery upgrades available for the specified bundle.
 *
 * @param id               - Identifier of the checkout order.
 * @param deliveryBundleId - Identifier of the delivery bundle.
 * @param config           - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getDeliveryBundleUpgrades: GetDeliveryBundleUpgrades = (
  id,
  deliveryBundleId,
  config,
) =>
  client
    .get(
      `/checkout/v1/orders/${id}/deliveryBundles/${deliveryBundleId}/upgrades`,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
export default getDeliveryBundleUpgrades;
