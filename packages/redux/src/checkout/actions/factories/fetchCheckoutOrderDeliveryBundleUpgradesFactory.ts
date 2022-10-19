import * as actionTypes from '../../actionTypes';
import {
  CheckoutOrder,
  Config,
  DeliveryBundle,
  DeliveryBundleUpgrades,
  GetCheckoutOrderDeliveryBundleUpgrades,
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
    deliveryBundleId: DeliveryBundle['id'],
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<DeliveryBundleUpgrades> => {
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
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_FAILURE,
      });

      throw error;
    }
  };

export default fetchCheckoutOrderDeliveryBundleUpgrades;
