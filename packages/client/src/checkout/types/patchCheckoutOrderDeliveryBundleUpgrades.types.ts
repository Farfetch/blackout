import type { Config } from '../../types';

export type PatchCheckoutOrderDeliveryBundleUpgradesData = {
  op: string;
  path: string;
  value: string;
};

export type PatchCheckoutOrderDeliveryBundleUpgrades = (
  id: number,
  deliveryBundleId: string,
  data: Array<PatchCheckoutOrderDeliveryBundleUpgradesData>,
  config?: Config,
) => Promise<number>;
