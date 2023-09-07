import type { CheckoutOrder } from './checkoutOrder.types.js';
import type { CheckoutOrderDeliveryBundle } from './deliveryBundle.types.js';
import type { Config } from '../../types/index.js';
import type { ReplacePatch } from 'json-patch';

export type PatchCheckoutOrderDeliveryBundlesData = Array<ReplacePatch>;

export type PatchCheckoutOrderDeliveryBundles = (
  checkoutOrderId: CheckoutOrder['id'],
  deliveryBundleId: CheckoutOrderDeliveryBundle['id'],
  data: PatchCheckoutOrderDeliveryBundlesData,
  config?: Config,
) => Promise<number>;
