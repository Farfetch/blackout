import client, { adaptError } from '../../helpers/client';

/**
 * Obtains the delivery upgrades available for the specified bundle.
 *
 * @function getDeliveryBundleUpgrades
 * @memberof module:checkout/client
 *
 * @param {string} id - Identifier of the checkout order.
 * @param {string} deliveryBundleId - Identifier of the delivery bundle.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, deliveryBundleId, config) =>
  client
    .get(
      `/checkout/v1/orders/${id}/deliveryBundles/${deliveryBundleId}/upgrades`,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
