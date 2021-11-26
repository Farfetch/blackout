import { fetchUpgradeItemDeliveryProvisioningFactory } from './factories';
import { getUpgradeItemDeliveryProvisioning } from '@farfetch/blackout-client/checkout';

/**
 * Fetch Upgrade Item Delivery Provisioning.
 *
 * @memberof module:checkout/actions
 *
 * @name fetchUpgradeItemDeliveryProvisioning
 *
 * @type {FetchUpgradeItemDeliveryProvisioningThunkFactory}
 */
export default fetchUpgradeItemDeliveryProvisioningFactory(
  getUpgradeItemDeliveryProvisioning,
);
