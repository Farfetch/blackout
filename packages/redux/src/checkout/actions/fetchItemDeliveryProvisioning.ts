import { fetchItemDeliveryProvisioningFactory } from './factories';
import { getCheckoutOrderDeliveryBundleProvisioning } from '@farfetch/blackout-client';

/**
 * Fetch item delivery provisioning.
 */
export default fetchItemDeliveryProvisioningFactory(
  getCheckoutOrderDeliveryBundleProvisioning,
);
