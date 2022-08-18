import type { Config } from '../../types';
import type { ItemDeliveryProvisioning } from '.';

export type GetCheckoutOrderDeliveryBundleUpgradeProvisioning = (
  id: number,
  deliveryBundleId: string,
  upgradeId: string,
  config?: Config,
) => Promise<ItemDeliveryProvisioning[]>;
