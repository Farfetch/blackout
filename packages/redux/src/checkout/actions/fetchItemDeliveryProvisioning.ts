import { fetchItemDeliveryProvisioningFactory } from './factories';
import { getItemDeliveryProvisioning } from '@farfetch/blackout-client/checkout';

/**
 * Fetch item delivery provisioning.
 *
 * @memberof module:checkout/actions
 *
 * @name fetchItemDeliveryProvisioning
 *
 * @type {FetchItemDeliveryProvisioningFactory}
 */
export default fetchItemDeliveryProvisioningFactory(
  getItemDeliveryProvisioning,
);
