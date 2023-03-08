import type {
  CheckoutOrder,
  DeliveryBundle,
  DeliveryBundleUpgrade,
  ItemDeliveryProvisioning,
} from './index.js';
import type { Config } from '../../types/index.js';

export type GetCheckoutOrderDeliveryBundleUpgradeProvisioning = (
  checkoutOrderId: CheckoutOrder['id'],
  deliveryBundleId: DeliveryBundle['id'],
  upgradeId: DeliveryBundleUpgrade['id'],
  config?: Config,
) => Promise<ItemDeliveryProvisioning[]>;
