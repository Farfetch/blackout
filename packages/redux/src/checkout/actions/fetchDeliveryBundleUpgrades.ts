import { fetchDeliveryBundleUpgradesFactory } from './factories';
import { getCheckoutOrderDeliveryBundleUpgrades } from '@farfetch/blackout-client';

/**
 * Fetch Delivery Bundle Upgrades.
 */
export default fetchDeliveryBundleUpgradesFactory(
  getCheckoutOrderDeliveryBundleUpgrades,
);
