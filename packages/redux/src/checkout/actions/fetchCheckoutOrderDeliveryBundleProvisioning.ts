import { fetchCheckoutOrderDeliveryBundleProvisioningFactory } from './factories/index.js';
import { getCheckoutOrderDeliveryBundleProvisioning } from '@farfetch/blackout-client';

/**
 * Fetch checkout order item delivery provisioning.
 */
export default fetchCheckoutOrderDeliveryBundleProvisioningFactory(
  getCheckoutOrderDeliveryBundleProvisioning,
);
