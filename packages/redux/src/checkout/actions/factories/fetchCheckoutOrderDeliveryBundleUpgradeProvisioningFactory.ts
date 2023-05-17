import * as actionTypes from '../../actionTypes.js';
import {
  type CheckoutOrder,
  type CheckoutOrderDeliveryBundle,
  type CheckoutOrderDeliveryBundleUpdate,
  type CheckoutOrderItemDeliveryProvisioning,
  type Config,
  type GetCheckoutOrderDeliveryBundleUpgradeProvisioning,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import itemDeliveryProvisioningSchema from '../../../entities/schemas/itemDeliveryProvisioning.js';
import type { Dispatch } from 'redux';

/**
 * Obtains the items delivery provisioning available for a upgrade.
 *
 * @param getCheckoutOrderDeliveryBundleUpgradeProvisioning - Get upgrade item delivery provisioning client.
 *
 * @returns Thunk factory.
 */
const fetchCheckoutOrderDeliveryBundleUpgradeProvisioning =
  (
    getCheckoutOrderDeliveryBundleUpgradeProvisioning: GetCheckoutOrderDeliveryBundleUpgradeProvisioning,
  ) =>
  (
    checkoutOrderId: CheckoutOrder['id'],
    deliveryBundleId: CheckoutOrderDeliveryBundle['id'],
    upgradeId: CheckoutOrderDeliveryBundleUpdate['id'],
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch,
  ): Promise<CheckoutOrderItemDeliveryProvisioning[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_REQUEST,
      });

      const result = await getCheckoutOrderDeliveryBundleUpgradeProvisioning(
        checkoutOrderId,
        deliveryBundleId,
        upgradeId,
        config,
      );

      dispatch({
        meta: { deliveryBundleId, upgradeId },
        payload: normalize(result, itemDeliveryProvisioningSchema),
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchCheckoutOrderDeliveryBundleUpgradeProvisioning;
