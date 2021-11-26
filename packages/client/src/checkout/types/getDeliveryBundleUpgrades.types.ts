import type { Config } from '../../types';
import type { GetDeliveryBundleUpgradesResponse } from '.';

export type GetDeliveryBundleUpgrades = (
  id: number,
  deliveryBundleId: string,
  config?: Config,
) => Promise<GetDeliveryBundleUpgradesResponse>;
