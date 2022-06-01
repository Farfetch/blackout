import {
  UPDATE_DELIVERY_BUNDLE_UPGRADES_FAILURE,
  UPDATE_DELIVERY_BUNDLE_UPGRADES_REQUEST,
  UPDATE_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  PatchDeliveryBundleUpgrades,
  PatchDeliveryBundleUpgradesData,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @param id               - Identifier of the checkout order.
 * @param deliveryBundleId - Identifier of the delivery bundle.
 * @param data             - JSON Patch document to update a list of upgrades JSONPatch document as
 *                           defined by RFC 6902 using: op: replace and test path: \{index\}/isSelected
 *                           and \{index\}/id where \{index\} is the index (zero-based) of the delivery
 *                           bundle upgrade to select.
 *
 *                               It's recommended to add a test operation to the request to
 *                               guarantee the index is the upgrade to be selected.
 *                               Example:
 *                                 [
 *                                    \{
 *                                       "op":"replace",
 *                                       "path": "0/isSelected",
 *                                       "value": "true"
 *                                    \}
 *                                    \{
 *                                       "op":"test",
 *                                       "path": "0/id",
 *                                       "value": "25314851"
 *                                    \}
 *                                 ].
 * @param config           - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Updates a list of delivery bundle upgrades available for a delivery bundle.
 *
 * @param patchDeliveryBundleUpgrades - Patch delivery bundle upgrades client.
 *
 * @returns Thunk factory.
 */
const updateDeliveryBundleUpgradesFactory =
  (patchDeliveryBundleUpgrades: PatchDeliveryBundleUpgrades) =>
  (
    id: number,
    deliveryBundleId: string,
    data: PatchDeliveryBundleUpgradesData,
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<number> => {
    dispatch({
      type: UPDATE_DELIVERY_BUNDLE_UPGRADES_REQUEST,
    });

    try {
      const result = await patchDeliveryBundleUpgrades(
        id,
        deliveryBundleId,
        data,
        config,
      );
      dispatch({
        type: UPDATE_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: UPDATE_DELIVERY_BUNDLE_UPGRADES_FAILURE,
      });

      throw error;
    }
  };

export default updateDeliveryBundleUpgradesFactory;
