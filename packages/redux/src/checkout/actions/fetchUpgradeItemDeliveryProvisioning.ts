import { fetchUpgradeItemDeliveryProvisioningFactory } from './factories';
import { getCheckoutOrderDeliveryBundleUpgradeProvisioning } from '@farfetch/blackout-client';

/**
 * Fetch Upgrade Item Delivery Provisioning.
 */
export default fetchUpgradeItemDeliveryProvisioningFactory(
  getCheckoutOrderDeliveryBundleUpgradeProvisioning,
);
