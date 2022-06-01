import { fetchUpgradeItemDeliveryProvisioningFactory } from './factories';
import { getUpgradeItemDeliveryProvisioning } from '@farfetch/blackout-client/checkout';

/**
 * Fetch Upgrade Item Delivery Provisioning.
 */
export default fetchUpgradeItemDeliveryProvisioningFactory(
  getUpgradeItemDeliveryProvisioning,
);
