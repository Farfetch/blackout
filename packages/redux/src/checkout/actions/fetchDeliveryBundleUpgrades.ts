import { fetchDeliveryBundleUpgradesFactory } from './factories';
import { getDeliveryBundleUpgrades } from '@farfetch/blackout-client/checkout';

/**
 * Fetch Delivery Bundle Upgrades.
 */
export default fetchDeliveryBundleUpgradesFactory(getDeliveryBundleUpgrades);
