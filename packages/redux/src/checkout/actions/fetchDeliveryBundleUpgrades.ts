import { fetchDeliveryBundleUpgradesFactory } from './factories';
import { getDeliveryBundleUpgrades } from '@farfetch/blackout-client/checkout';

/**
 * Fetch Delivery Bundle Upgrades.
 *
 * @memberof module:checkout/actions
 *
 * @name fetchDeliveryBundleUpgrades
 *
 * @type {FetchDeliveryBundleUpgradesThunkFactory}
 */
export default fetchDeliveryBundleUpgradesFactory(getDeliveryBundleUpgrades);
