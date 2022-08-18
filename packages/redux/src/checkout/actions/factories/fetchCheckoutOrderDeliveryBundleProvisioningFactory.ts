import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCheckoutOrderDeliveryBundleProvisioning,
  ItemDeliveryProvisioning,
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
const fetchCheckoutOrderDeliveryBundleProvisioning =
  (
    getCheckoutOrderDeliveryBundleProvisioning: GetCheckoutOrderDeliveryBundleProvisioning,
  ) =>
  (id: number, deliveryBundleId: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<ItemDeliveryProvisioning[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_REQUEST,
      });

      const result = await getCheckoutOrderDeliveryBundleProvisioning(
        id,
        deliveryBundleId,
        config,
      );
      dispatch({
        meta: { deliveryBundleId },
        payload: normalize(result, itemDeliveryProvisioningSchema),
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_FAILURE,
      });

      throw error;
    }
  };

export default fetchCheckoutOrderDeliveryBundleProvisioning;
