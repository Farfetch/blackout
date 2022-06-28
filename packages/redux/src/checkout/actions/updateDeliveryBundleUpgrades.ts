import { patchCheckoutOrderDeliveryBundleUpgrades } from '@farfetch/blackout-client';
import { updateDeliveryBundleUpgradesFactory } from './factories';

/**
 * Update Delivery Bundle Upgrades.
 */
export default updateDeliveryBundleUpgradesFactory(
  patchCheckoutOrderDeliveryBundleUpgrades,
);
