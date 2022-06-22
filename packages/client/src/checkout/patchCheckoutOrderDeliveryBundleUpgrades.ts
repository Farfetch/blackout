import client, { adaptError } from '../helpers/client';
import type { PatchCheckoutOrderDeliveryBundleUpgrades } from './types';

/**
 * Method responsible for applying the selected delivery bundle upgrade for the
 * specified bundle.
 *
 * @param id               - Identifier of the checkout order.
 * @param deliveryBundleId - Identifier of the delivery bundle.
 * @param data             - JSON Patch document to update a list of upgrades JSONPatch document as
 *                           defined by RFC 6902 using: op: replace and test path: \{index\}/isSelected
 *                           and \{index\}/id where \{index\} is the index (zero-based) of the delivery
 *                           bundle upgrade to select.
 *
 *                           It's recommended to add a test operation to the request to
 *                           guarantee the index is the upgrade to be selected.
 *                           Example:
 *                             [
 *                                \{
 *                                   "op":"replace",
 *                                   "path": "0/isSelected",
 *                                   "value": "true"
 *                                \}
 *                                \{
 *                                   "op":"test",
 *                                   "path": "0/id",
 *                                   "value": "25314851"
 *                                \}
 *                             ].
 * @param config           - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const patchCheckoutOrderDeliveryBundleUpgrades: PatchCheckoutOrderDeliveryBundleUpgrades =
  (id, deliveryBundleId, data, config) =>
    client
      .patch(
        `/checkout/v1/orders/${id}/deliveryBundles/${deliveryBundleId}/upgrades`,
        data,
        config,
      )
      .then(response => response.status)
      .catch(error => {
        throw adaptError(error);
      });
