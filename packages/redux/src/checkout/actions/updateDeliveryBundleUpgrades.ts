import { patchDeliveryBundleUpgrades } from '@farfetch/blackout-client/checkout';
import { updateDeliveryBundleUpgradesFactory } from './factories';

/**
 * Update Delivery Bundle Upgrades.
 *
 * @memberof module:checkout/actions
 *
 * @name updateDeliveryBundleUpgrades
 *
 * @type {UpdateDeliveryBundleUpgradesThunkFactory}
 */
export default updateDeliveryBundleUpgradesFactory(patchDeliveryBundleUpgrades);
