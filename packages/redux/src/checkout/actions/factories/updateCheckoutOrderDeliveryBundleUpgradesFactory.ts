import * as actionTypes from '../../actionTypes';
import {
  Config,
  PatchCheckoutOrderDeliveryBundleUpgrades,
  PatchCheckoutOrderDeliveryBundleUpgradesData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Updates a list of delivery bundle upgrades available for a delivery bundle.
 *
 * @param patchCheckoutOrderDeliveryBundleUpgrades - Patch delivery bundle upgrades client.
 *
 * @returns Thunk factory.
 */
const updateCheckoutOrderDeliveryBundleUpgradesFactory =
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
        type: actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_REQUEST,
      });

      const result = await patchCheckoutOrderDeliveryBundleUpgrades(
        id,
        deliveryBundleId,
        data,
        config,
      );
      dispatch({
        type: actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_FAILURE,
      });

      throw error;
    }
  };

export default updateCheckoutOrderDeliveryBundleUpgradesFactory;
