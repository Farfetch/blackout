import {
  FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_FAILURE,
  FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_REQUEST,
  FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import itemDeliveryProvisioningSchema from '../../../entities/schemas/itemDeliveryProvisioning';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetItemDeliveryProvisioningResponse,
  GetUpgradeItemDeliveryProvisioning,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @param id               - Identifier of the checkout order.
 * @param deliveryBundleId - Identifier of the delivery bundle.
 * @param upgradeId        - Identifier of the upgrade.
 * @param config           - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Obtains the items delivery provisioning available for a upgrade.
 *
 * @param getUpgradeItemDeliveryProvisioning - Get upgrade item delivery provisioning client.
 *
 * @returns Thunk factory.
 */
export default (
    getUpgradeItemDeliveryProvisioning: GetUpgradeItemDeliveryProvisioning,
  ) =>
  (id: number, deliveryBundleId: string, upgradeId: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetItemDeliveryProvisioningResponse> => {
    try {
      dispatch({
        type: FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_REQUEST,
      });

      const result = await getUpgradeItemDeliveryProvisioning(
        id,
        deliveryBundleId,
        upgradeId,
        config,
      );
      dispatch({
        meta: { deliveryBundleId, upgradeId },
        payload: normalize(result, itemDeliveryProvisioningSchema),
        type: FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_FAILURE,
      });

      throw error;
    }
  };
