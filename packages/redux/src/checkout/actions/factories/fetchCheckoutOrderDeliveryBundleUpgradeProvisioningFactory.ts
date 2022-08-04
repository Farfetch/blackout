import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCheckoutOrderDeliveryBundleUpgradeProvisioning,
  GetCheckoutOrderDeliveryBundleUpgradeProvisioningResponse,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import itemDeliveryProvisioningSchema from '../../../entities/schemas/itemDeliveryProvisioning';
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
  (id: number, deliveryBundleId: string, upgradeId: string, config?: Config) =>
  async (
    dispatch: Dispatch,
  ): Promise<GetCheckoutOrderDeliveryBundleUpgradeProvisioningResponse> => {
    try {
      dispatch({
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_REQUEST,
      });

      const result = await getCheckoutOrderDeliveryBundleUpgradeProvisioning(
        id,
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
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_FAILURE,
      });

      throw error;
    }
  };

export default fetchCheckoutOrderDeliveryBundleUpgradeProvisioning;
