import client, { adaptError } from '../helpers/client';
import type { GetUpgradeItemDeliveryProvisioning } from './types';
/**
 * Obtains the items delivery provisioning available for a upgrade.
 *
 * @function getUpgradeItemDeliveryProvisioning
 * @memberof module:checkout/client
 *
 * @param {number} id - Identifier of the checkout order.
 * @param {string} deliveryBundleId - Identifier of the delivery bundle.
 * @param {number} upgradeId - Identifier of the upgrade.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const getUpgradeItemDeliveryProvisioning: GetUpgradeItemDeliveryProvisioning = (
  id,
  deliveryBundleId,
  upgradeId,
  config,
) =>
  client
    .get(
      `/checkout/v1/orders/${id}/deliveryBundles/${deliveryBundleId}/upgrades/${upgradeId}/itemDeliveryProvisioning`,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getUpgradeItemDeliveryProvisioning;
