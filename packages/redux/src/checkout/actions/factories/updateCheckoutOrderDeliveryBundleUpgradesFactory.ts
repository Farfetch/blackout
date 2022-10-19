import * as actionTypes from '../../actionTypes';
import {
  CheckoutOrder,
  Config,
  DeliveryBundle,
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
    checkoutOrderId: CheckoutOrder['id'],
    deliveryBundleId: DeliveryBundle['id'],
    data: Array<PatchCheckoutOrderDeliveryBundleUpgradesData>,
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<number> => {
    try {
      dispatch({
        type: actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_REQUEST,
      });

      const result = await patchCheckoutOrderDeliveryBundleUpgrades(
        checkoutOrderId,
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
