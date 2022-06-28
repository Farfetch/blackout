import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type {
  Config,
  PatchCheckoutOrderDeliveryBundleUpgrades,
  PatchCheckoutOrderDeliveryBundleUpgradesData,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
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
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Updates a list of delivery bundle upgrades available for a delivery bundle.
 *
 * @param patchCheckoutOrderDeliveryBundleUpgrades - Patch delivery bundle upgrades client.
 *
 * @returns Thunk factory.
 */
const updateDeliveryBundleUpgradesFactory =
  (
    patchCheckoutOrderDeliveryBundleUpgrades: PatchCheckoutOrderDeliveryBundleUpgrades,
  ) =>
  (
    id: number,
    deliveryBundleId: string,
    data: Array<PatchCheckoutOrderDeliveryBundleUpgradesData>,
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<number> => {
    try {
      dispatch({
        type: actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_REQUEST,
      });

      const result = await patchCheckoutOrderDeliveryBundleUpgrades(
        id,
        deliveryBundleId,
        data,
        config,
      );
      dispatch({
        type: actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_FAILURE,
      });

      throw error;
    }
  };

export default updateDeliveryBundleUpgradesFactory;
