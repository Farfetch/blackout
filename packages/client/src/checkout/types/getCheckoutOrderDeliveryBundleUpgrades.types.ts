import type {
  CheckoutOrder,
  DeliveryBundle,
  DeliveryBundleUpgrades,
} from './index.js';
import type { Config } from '../../types/index.js';

export type GetCheckoutOrderDeliveryBundleUpgrades = (
  checkoutOrderId: CheckoutOrder['id'],
  deliveryBundleId: DeliveryBundle['id'],
  config?: Config,
) => Promise<DeliveryBundleUpgrades>;
