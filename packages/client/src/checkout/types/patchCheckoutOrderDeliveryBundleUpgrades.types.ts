import type { CheckoutOrder } from './checkoutOrder.types';
import type { Config } from '../../types';
import type { DeliveryBundle } from './deliveryBundle.types';
import type { ReplacePatch, TestPatch } from 'json-patch';

export type PatchCheckoutOrderDeliveryBundleUpgradesData =
  | ReplacePatch
  | TestPatch;

export type PatchCheckoutOrderDeliveryBundleUpgrades = (
  checkoutOrderId: CheckoutOrder['id'],
  deliveryBundleId: DeliveryBundle['id'],
  data: Array<PatchCheckoutOrderDeliveryBundleUpgradesData>,
  config?: Config,
) => Promise<number>;
