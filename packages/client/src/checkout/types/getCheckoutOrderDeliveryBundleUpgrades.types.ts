import type { Config } from '../../types';
import type { DeliveryBundleUpgrades } from '.';

export type GetCheckoutOrderDeliveryBundleUpgrades = (
  id: number,
  deliveryBundleId: string,
  config?: Config,
) => Promise<DeliveryBundleUpgrades>;
