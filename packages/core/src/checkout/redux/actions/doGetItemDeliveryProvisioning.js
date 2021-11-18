import {
  GET_ITEM_DELIVERY_PROVISIONING_FAILURE,
  GET_ITEM_DELIVERY_PROVISIONING_REQUEST,
  GET_ITEM_DELIVERY_PROVISIONING_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import itemDeliveryProvisioningSchema from '../../../entities/schemas/itemDeliveryProvisioning';

/**
 * @callback GetItemDeliveryProvisioningThunkFactory
 * @param {string} id - Identifier of the checkout order.
 * @param {string} deliveryBundleId - Identifier of the delivery bundle.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Obtains the item's provisioning for the specified bundle.
 *
 * @function doGetItemDeliveryProvisioning
 * @memberof module:checkout/actions
 *
 * @param {Function} getItemDeliveryProvisioning - Get item delivery
 * provisioning client.
 *
 * @returns {GetItemDeliveryProvisioningThunkFactory} Thunk factory.
 */
export default getItemDeliveryProvisioning =>
  (id, deliveryBundleId, config) =>
  async dispatch => {
    dispatch({
      type: GET_ITEM_DELIVERY_PROVISIONING_REQUEST,
    });

    try {
      const result = await getItemDeliveryProvisioning(
        id,
        deliveryBundleId,
        config,
      );
      dispatch({
        meta: { deliveryBundleId },
        payload: normalize(result, itemDeliveryProvisioningSchema),
        type: GET_ITEM_DELIVERY_PROVISIONING_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_ITEM_DELIVERY_PROVISIONING_FAILURE,
      });

      throw error;
    }
  };
