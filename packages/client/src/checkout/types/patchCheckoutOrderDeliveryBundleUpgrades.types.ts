import type { CheckoutOrder } from './checkoutOrder.types';
import type { Config } from '../../types';
import type { DeliveryBundle } from './deliveryBundle.types';

export type PatchCheckoutOrderDeliveryBundleUpgradesData = {
  op: string;
  path: string;
  value: string;
};

export type PatchCheckoutOrderDeliveryBundleUpgrades = (
  checkoutOrderId: CheckoutOrder['id'],
  deliveryBundleId: DeliveryBundle['id'],
  data: Array<PatchCheckoutOrderDeliveryBundleUpgradesData>,
  config?: Config,
) => Promise<number>;
