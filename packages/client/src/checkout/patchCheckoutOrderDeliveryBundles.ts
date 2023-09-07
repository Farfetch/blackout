import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import type { PatchCheckoutOrderDeliveryBundles } from './types/index.js';

/**
 * Method responsible for applying the selected delivery bundle for the
 * specified checkout order.
 *
 * @param checkoutOrderId  - Identifier of the checkout order.
 * @param deliveryBundleId - Identifier of the delivery bundle.
 * @param data             - JSON Patch document to update a list of upgrades JSONPatch document as
 *                           defined by RFC 6902 using: op: replace and test path: \{index\}/isSelected
 *                           and \{index\}/id where \{index\} is the index (zero-based) of the delivery
 *                           bundle to select.
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
 *                             ].
 * @param config           - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const patchCheckoutOrderDeliveryBundles: PatchCheckoutOrderDeliveryBundles = (
  checkoutOrderId,
  deliveryBundleId,
  data,
  config,
) =>
  client
    .patch(
      `/checkout/v1/orders/${checkoutOrderId}/deliveryBundles/${deliveryBundleId}`,
      data,
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default patchCheckoutOrderDeliveryBundles;
