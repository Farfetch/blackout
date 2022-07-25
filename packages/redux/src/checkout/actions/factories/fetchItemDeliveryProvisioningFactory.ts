import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCheckoutOrderDeliveryBundleProvisioning,
  GetCheckoutOrderDeliveryBundleProvisioningResponse,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import itemDeliveryProvisioningSchema from '../../../entities/schemas/itemDeliveryProvisioning';
import type { Dispatch } from 'redux';

/**
 * Obtains the item's provisioning for the specified bundle.
 *
 * @param getCheckoutOrderDeliveryBundleProvisioning - Get item delivery provisioning client.
 *
 * @returns Thunk factory.
 */
const fetchItemDeliveryProvisioningFactory =
  (
    getCheckoutOrderDeliveryBundleProvisioning: GetCheckoutOrderDeliveryBundleProvisioning,
  ) =>
  (id: number, deliveryBundleId: string, config?: Config) =>
  async (
    dispatch: Dispatch,
  ): Promise<GetCheckoutOrderDeliveryBundleProvisioningResponse> => {
    try {
      dispatch({
        type: actionTypes.FETCH_ITEM_DELIVERY_PROVISIONING_REQUEST,
      });

      const result = await getCheckoutOrderDeliveryBundleProvisioning(
        id,
        deliveryBundleId,
        config,
      );
      dispatch({
        meta: { deliveryBundleId },
        payload: normalize(result, itemDeliveryProvisioningSchema),
        type: actionTypes.FETCH_ITEM_DELIVERY_PROVISIONING_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_ITEM_DELIVERY_PROVISIONING_FAILURE,
      });

      throw error;
    }
  };

export default fetchItemDeliveryProvisioningFactory;
