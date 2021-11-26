import type { Config } from '../../types';

export enum DeliveryBundleUpgradesOperation {
  replace,
  test,
}

export type PatchDeliveryBundleUpgradesData = {
  op: DeliveryBundleUpgradesOperation;
  path: string;
  value: string;
}[];

export type PatchDeliveryBundleUpgrades = (
  id: number,
  deliveryBundleId: string,
  data: PatchDeliveryBundleUpgradesData,
  config?: Config,
) => Promise<number>;
