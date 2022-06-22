import type { Config } from '../../types';
import type { GetCheckoutOrderDeliveryBundleUpgradesResponse } from '.';

export type GetCheckoutOrderDeliveryBundleUpgrades = (
  id: number,
  deliveryBundleId: string,
  config?: Config,
) => Promise<GetCheckoutOrderDeliveryBundleUpgradesResponse>;
