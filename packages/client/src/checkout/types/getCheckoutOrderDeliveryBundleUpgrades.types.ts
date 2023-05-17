import type {
  CheckoutOrder,
  CheckoutOrderDeliveryBundle,
  CheckoutOrderDeliveryBundleUpgrades,
} from './index.js';
import type { Config } from '../../types/index.js';

export type GetCheckoutOrderDeliveryBundleUpgrades = (
  checkoutOrderId: CheckoutOrder['id'],
  deliveryBundleId: CheckoutOrderDeliveryBundle['id'],
  config?: Config,
) => Promise<CheckoutOrderDeliveryBundleUpgrades>;
