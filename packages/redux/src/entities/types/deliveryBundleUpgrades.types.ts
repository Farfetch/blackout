import type { DeliveryBundleUpgrades } from '@farfetch/blackout-client';

export type DeliveryBundleUpgradesEntity = {
  [deliveryBundleId: string]: DeliveryBundleUpgrades;
};
