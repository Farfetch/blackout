import {
  UPDATE_DELIVERY_BUNDLE_UPGRADE_FAILURE,
  UPDATE_DELIVERY_BUNDLE_UPGRADE_REQUEST,
  UPDATE_DELIVERY_BUNDLE_UPGRADE_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} UpdateDeliveryBundleUpgradeData
 * @property {string} [operation] - JSONPatch operation for the
 * specified upgrade ('replace' by default).
 * @property {object} [value] - JSONPatch value for the
 * specified upgrade ('true by default).
 * @property {object} [path] - JSONPatch path for the
 * specified upgrade ('/isSelected' by default).
 */

/**
 * @callback UpdateDeliveryBundleUpgradeThunkFactory
 * @param {string} id - Identifier of the checkout order.
 * @param {string} deliveryBundleId - Identifier of the delivery bundle.
 * @param {string} upgradeId - Identifier of the upgrade.
 * @param {UpdateDeliveryBundleUpgradeData} [data] - JSONPatch value, operation
 * and path for the specified upgrade.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Updates the selected delivery bundle upgrade available for a delivery bundle.
 *
 * @function doUpdateDeliveryBundleUpgrade
 * @memberof module:checkout/actions
 *
 * @param {Function} patchDeliveryBundleUpgrade - Patch delivery bundle upgrade
 * client.
 *
 * @returns {UpdateDeliveryBundleUpgradeThunkFactory} Thunk factory.
 */
export default patchDeliveryBundleUpgrade =>
  (id, deliveryBundleId, upgradeId, data, config) =>
  async dispatch => {
    dispatch({
      type: UPDATE_DELIVERY_BUNDLE_UPGRADE_REQUEST,
    });

    try {
      await patchDeliveryBundleUpgrade(
        id,
        deliveryBundleId,
        upgradeId,
        data,
        config,
      );
      dispatch({
        type: UPDATE_DELIVERY_BUNDLE_UPGRADE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: UPDATE_DELIVERY_BUNDLE_UPGRADE_FAILURE,
      });

      throw error;
    }
  };
