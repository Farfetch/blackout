import * as actionTypes from '../../actionTypes.js';
import {
  type CheckoutOrder,
  type CheckoutOrderDeliveryBundle,
  type Config,
  type PatchCheckoutOrderDeliveryBundleUpgrades,
  type PatchCheckoutOrderDeliveryBundleUpgradesData,
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
    deliveryBundleId: CheckoutOrderDeliveryBundle['id'],
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default updateCheckoutOrderDeliveryBundleUpgradesFactory;
