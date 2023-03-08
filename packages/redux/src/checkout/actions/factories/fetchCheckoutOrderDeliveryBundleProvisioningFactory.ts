import * as actionTypes from '../../actionTypes.js';
import {
  type CheckoutOrder,
  type Config,
  type DeliveryBundle,
  type GetCheckoutOrderDeliveryBundleProvisioning,
  type ItemDeliveryProvisioning,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import itemDeliveryProvisioningSchema from '../../../entities/schemas/itemDeliveryProvisioning.js';
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
  (
    checkoutOrderId: CheckoutOrder['id'],
    deliveryBundleId: DeliveryBundle['id'],
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<ItemDeliveryProvisioning[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_REQUEST,
      });

      const result = await getCheckoutOrderDeliveryBundleProvisioning(
        checkoutOrderId,
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchCheckoutOrderDeliveryBundleProvisioning;
