import type { CheckoutOrder, CheckoutOrderDeliveryBundle } from './index.js';
import type { Config } from '../../types/index.js';

export type GetCheckoutOrderDeliveryBundles = (
  checkoutOrderId: CheckoutOrder['id'],
  config?: Config,
) => Promise<CheckoutOrderDeliveryBundle[]>;
