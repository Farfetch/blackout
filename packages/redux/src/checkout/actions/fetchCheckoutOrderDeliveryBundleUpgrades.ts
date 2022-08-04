import { fetchCheckoutOrderDeliveryBundleUpgradesFactory } from './factories';
import { getCheckoutOrderDeliveryBundleUpgrades } from '@farfetch/blackout-client';

/**
 * Fetch checkout order delivery bundle upgrades.
 */
export default fetchCheckoutOrderDeliveryBundleUpgradesFactory(
  getCheckoutOrderDeliveryBundleUpgrades,
);
