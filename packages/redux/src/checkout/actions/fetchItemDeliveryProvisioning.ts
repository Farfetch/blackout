import { fetchItemDeliveryProvisioningFactory } from './factories';
import { getItemDeliveryProvisioning } from '@farfetch/blackout-client/checkout';

/**
 * Fetch item delivery provisioning.
 */
export default fetchItemDeliveryProvisioningFactory(
  getItemDeliveryProvisioning,
);
