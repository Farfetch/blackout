import client, { adaptError } from '../../helpers/client';

/**
 * @typedef {object} PatchDeliveryBundleUpgradeData
 *
 * @alias PatchDeliveryBundleUpgradeData
 * @memberof module:checkout/client
 *
 * @property {string} [operation] - JSONPatch operation for the
 * specified upgrade ('replace' by default).
 * @property {object} [value] - JSONPatch value for the
 * specified upgrade ('true by default).
 * @property {object} [path] - JSONPatch path for the
 * specified upgrade ('/isSelected' by default).
 */

/**
 * Applies the selected delivery bundle upgrade for the specified bundle.
 *
 * @function patchDeliveryBundleUpgrade
 * @memberof module:checkout/client
 *
 * @param {string} id - Identifier of the checkout order.
 * @param {string} deliveryBundleId - Identifier of the delivery bundle.
 * @param {string} upgradeId - Identifier of the upgrade.
 * @param {PatchDeliveryBundleUpgradeData} [data] - JSONPatch value, operation
 * and path for the specified upgrade.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, deliveryBundleId, upgradeId, data, config) =>
  client
    .patch(
      `/checkout/v1/orders/${id}/deliveryBundles/${deliveryBundleId}/upgrades/${upgradeId}`,
      [
        {
          op: data.op || 'replace',
          path: data.path || '/isSelected',
          value: data.value || 'true',
        },
      ],
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });
