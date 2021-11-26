import {
  FETCH_DELIVERY_BUNDLE_UPGRADES_FAILURE,
  FETCH_DELIVERY_BUNDLE_UPGRADES_REQUEST,
  FETCH_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetDeliveryBundleUpgrades,
  GetDeliveryBundleUpgradesResponse,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @callback FetchDeliveryBundleUpgradesThunkFactory
 * @param {string} id - Identifier of the checkout order.
 * @param {string} deliveryBundleId - Identifier of the delivery bundle.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Obtains the delivery upgrades available for the specified bundle.
 *
 * @function fetchDeliveryBundleUpgradesFactory
 * @memberof module:checkout/actions/factories
 *
 * @param {Function} getDeliveryBundleUpgrades - Get delivery bundle upgrades
 * client.
 *
 * @returns {FetchDeliveryBundleUpgradesThunkFactory} Thunk factory.
 */
export default (getDeliveryBundleUpgrades: GetDeliveryBundleUpgrades) =>
  (id: number, deliveryBundleId: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetDeliveryBundleUpgradesResponse> => {
    dispatch({
      type: FETCH_DELIVERY_BUNDLE_UPGRADES_REQUEST,
    });

    try {
      const result = await getDeliveryBundleUpgrades(
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
        type: FETCH_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_DELIVERY_BUNDLE_UPGRADES_FAILURE,
      });

      throw error;
    }
  };
