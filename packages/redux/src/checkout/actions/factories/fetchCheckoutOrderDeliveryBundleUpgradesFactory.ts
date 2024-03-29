import * as actionTypes from '../../actionTypes.js';
import {
  type CheckoutOrder,
  type CheckoutOrderDeliveryBundle,
  type CheckoutOrderDeliveryBundleUpgrades,
  type Config,
  type GetCheckoutOrderDeliveryBundleUpgrades,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Obtains the delivery upgrades available for the specified bundle.
 *
 * @param getCheckoutOrderDeliveryBundleUpgrades - Get delivery bundle upgrades client.
 *
 * @returns Thunk factory.
 */
const fetchCheckoutOrderDeliveryBundleUpgrades =
  (
    getCheckoutOrderDeliveryBundleUpgrades: GetCheckoutOrderDeliveryBundleUpgrades,
  ) =>
  (
    checkoutOrderId: CheckoutOrder['id'],
    deliveryBundleId: CheckoutOrderDeliveryBundle['id'],
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<CheckoutOrderDeliveryBundleUpgrades> => {
    try {
      dispatch({
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_REQUEST,
      });

      const result = await getCheckoutOrderDeliveryBundleUpgrades(
        checkoutOrderId,
        deliveryBundleId,
        config,
      );

      dispatch({
        payload: {
          entities: {
            deliveryBundleUpgrades: {
              [deliveryBundleId]: {
                ...result,
              },
            },
          },
          result: deliveryBundleId,
        },
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchCheckoutOrderDeliveryBundleUpgrades;
