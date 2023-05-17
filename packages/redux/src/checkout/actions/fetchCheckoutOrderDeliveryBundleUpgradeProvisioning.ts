import { fetchCheckoutOrderDeliveryBundleUpgradeProvisioningFactory } from './factories/index.js';
import { getCheckoutOrderDeliveryBundleUpgradeProvisioning } from '@farfetch/blackout-client';

/**
 * Fetch checkout order upgrade item delivery provisioning.
 */
export default fetchCheckoutOrderDeliveryBundleUpgradeProvisioningFactory(
  getCheckoutOrderDeliveryBundleUpgradeProvisioning,
);
