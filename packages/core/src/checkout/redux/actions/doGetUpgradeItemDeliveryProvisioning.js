import {
  GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_FAILURE,
  GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_REQUEST,
  GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import itemDeliveryProvisioningSchema from '../../../entities/schemas/itemDeliveryProvisioning';

/**
 * @callback GetUpgradeItemDeliveryProvisioningThunkFactory
 * @param {string} id - Identifier of the checkout order.
 * @param {string} deliveryBundleId - Identifier of the delivery bundle.
 * @param {string} upgradeId - Identifier of the upgrade.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Obtains the items delivery provisioning available for a upgrade.
 *
 * @function doGetUpgradeItemDeliveryProvisioning
 * @memberof module:checkout/actions
 *
 * @param {Function} getUpgradeItemDeliveryProvisioning - Get upgrade item
 * delivery provisioning client.
 *
 * @returns {GetUpgradeItemDeliveryProvisioningThunkFactory} Thunk factory.
 */
export default getUpgradeItemDeliveryProvisioning =>
  (id, deliveryBundleId, upgradeId, config) =>
  async dispatch => {
    dispatch({
      type: GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_REQUEST,
    });

    try {
      const result = await getUpgradeItemDeliveryProvisioning(
        id,
        deliveryBundleId,
        upgradeId,
        config,
      );
      dispatch({
        meta: { deliveryBundleId, upgradeId },
        payload: normalize(result, itemDeliveryProvisioningSchema),
        type: GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_FAILURE,
      });

      throw error;
    }
  };
