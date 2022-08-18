import type { Config } from '../../types';
import type { ItemDeliveryProvisioning } from '.';

export type GetCheckoutOrderDeliveryBundleProvisioning = (
  id: number,
  deliveryBundleId: string,
  config?: Config,
) => Promise<ItemDeliveryProvisioning[]>;
