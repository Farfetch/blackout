import type {
  CheckoutOrder,
  CheckoutOrderDeliveryBundle,
  CheckoutOrderDeliveryBundleUpgrade,
  CheckoutOrderItemDeliveryProvisioning,
} from './index.js';
import type { Config } from '../../types/index.js';

export type GetCheckoutOrderDeliveryBundleUpgradeProvisioning = (
  checkoutOrderId: CheckoutOrder['id'],
  deliveryBundleId: CheckoutOrderDeliveryBundle['id'],
  upgradeId: CheckoutOrderDeliveryBundleUpgrade['id'],
  config?: Config,
) => Promise<CheckoutOrderItemDeliveryProvisioning[]>;
