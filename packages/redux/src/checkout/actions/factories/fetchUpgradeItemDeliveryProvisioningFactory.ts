import {
  FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_FAILURE,
  FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_REQUEST,
  FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import itemDeliveryProvisioningSchema from '../../../entities/schemas/itemDeliveryProvisioning';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetItemDeliveryProvisioningResponse,
  GetUpgradeItemDeliveryProvisioning,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @callback FetchUpgradeItemDeliveryProvisioningThunkFactory
 * @param {number} id - Identifier of the checkout order.
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
 * @function fetchUpgradeItemDeliveryProvisioningFactory
 * @memberof module:checkout/actions/factories
 *
 * @param {Function} getUpgradeItemDeliveryProvisioning - Get upgrade item
 * delivery provisioning client.
 *
 * @returns {FetchUpgradeItemDeliveryProvisioningThunkFactory} Thunk factory.
 */
export default (
    getUpgradeItemDeliveryProvisioning: GetUpgradeItemDeliveryProvisioning,
  ) =>
  (id: number, deliveryBundleId: string, upgradeId: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetItemDeliveryProvisioningResponse> => {
    dispatch({
      type: FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_REQUEST,
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
        type: FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_FAILURE,
      });

      throw error;
    }
  };
