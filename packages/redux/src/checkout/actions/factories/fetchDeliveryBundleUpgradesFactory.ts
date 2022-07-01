import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCheckoutOrderDeliveryBundleUpgrades,
  GetCheckoutOrderDeliveryBundleUpgradesResponse,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * @param id               - Identifier of the checkout order.
 * @param deliveryBundleId - Identifier of the delivery bundle.
 * @param config           - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Obtains the delivery upgrades available for the specified bundle.
 *
 * @param getCheckoutOrderDeliveryBundleUpgrades - Get delivery bundle upgrades client.
 *
 * @returns Thunk factory.
 */
const fetchDeliveryBundleUpgradesFactory =
  (
    getCheckoutOrderDeliveryBundleUpgrades: GetCheckoutOrderDeliveryBundleUpgrades,
  ) =>
  (id: number, deliveryBundleId: string, config?: Config) =>
  async (
    dispatch: Dispatch,
  ): Promise<GetCheckoutOrderDeliveryBundleUpgradesResponse> => {
    try {
      dispatch({
        type: actionTypes.FETCH_DELIVERY_BUNDLE_UPGRADES_REQUEST,
      });

      const result = await getCheckoutOrderDeliveryBundleUpgrades(
        id,
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
        type: actionTypes.FETCH_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_DELIVERY_BUNDLE_UPGRADES_FAILURE,
      });

      throw error;
    }
  };

export default fetchDeliveryBundleUpgradesFactory;
