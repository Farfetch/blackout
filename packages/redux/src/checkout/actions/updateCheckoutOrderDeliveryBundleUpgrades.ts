import { patchCheckoutOrderDeliveryBundleUpgrades } from '@farfetch/blackout-client';
import { updateCheckoutOrderDeliveryBundleUpgradesFactory } from './factories';

/**
 * Update checkout order delivery bundle upgrades.
 */
export default updateCheckoutOrderDeliveryBundleUpgradesFactory(
  patchCheckoutOrderDeliveryBundleUpgrades,
);
