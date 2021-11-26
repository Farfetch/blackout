import {
  FETCH_ITEM_DELIVERY_PROVISIONING_FAILURE,
  FETCH_ITEM_DELIVERY_PROVISIONING_REQUEST,
  FETCH_ITEM_DELIVERY_PROVISIONING_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import itemDeliveryProvisioningSchema from '../../../entities/schemas/itemDeliveryProvisioning';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetItemDeliveryProvisioning,
  GetItemDeliveryProvisioningResponse,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @callback FetchItemDeliveryProvisioningThunkFactory
 * @param {number} id - Identifier of the checkout order.
 * @param {string} deliveryBundleId - Identifier of the delivery bundle.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Obtains the item's provisioning for the specified bundle.
 *
 * @function fetchItemDeliveryProvisioningFactory
 * @memberof module:checkout/actions/factories
 *
 * @param {Function} getItemDeliveryProvisioning - Get item delivery
 * provisioning client.
 *
 * @returns {FetchItemDeliveryProvisioningThunkFactory} Thunk factory.
 */
export default (getItemDeliveryProvisioning: GetItemDeliveryProvisioning) =>
  (id: number, deliveryBundleId: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetItemDeliveryProvisioningResponse> => {
    dispatch({
      type: FETCH_ITEM_DELIVERY_PROVISIONING_REQUEST,
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
        type: FETCH_ITEM_DELIVERY_PROVISIONING_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_ITEM_DELIVERY_PROVISIONING_FAILURE,
      });

      throw error;
    }
  };
