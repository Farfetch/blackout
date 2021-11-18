import {
  GET_DELIVERY_BUNDLE_UPGRADES_FAILURE,
  GET_DELIVERY_BUNDLE_UPGRADES_REQUEST,
  GET_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetDeliveryBundleUpgradesThunkFactory
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
 * @function doGetDeliveryBundleUpgrades
 * @memberof module:checkout/actions
 *
 * @param {Function} getDeliveryBundleUpgrades - Get delivery bundle upgrades
 * client.
 *
 * @returns {GetDeliveryBundleUpgradesThunkFactory} Thunk factory.
 */
export default getDeliveryBundleUpgrades =>
  (id, deliveryBundleId, config) =>
  async dispatch => {
    dispatch({
      type: GET_DELIVERY_BUNDLE_UPGRADES_REQUEST,
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
        type: GET_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_DELIVERY_BUNDLE_UPGRADES_FAILURE,
      });

      throw error;
    }
  };
