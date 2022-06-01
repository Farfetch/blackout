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
 * @param id               - Identifier of the checkout order.
 * @param deliveryBundleId - Identifier of the delivery bundle.
 * @param config           - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Obtains the item's provisioning for the specified bundle.
 *
 * @param getItemDeliveryProvisioning - Get item delivery provisioning client.
 *
 * @returns Thunk factory.
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
