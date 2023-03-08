import { fetchCheckoutOrderDeliveryBundleUpgradesFactory } from './factories/index.js';
import { getCheckoutOrderDeliveryBundleUpgrades } from '@farfetch/blackout-client';

/**
 * Fetch checkout order delivery bundle upgrades.
 */
export default fetchCheckoutOrderDeliveryBundleUpgradesFactory(
  getCheckoutOrderDeliveryBundleUpgrades,
);
