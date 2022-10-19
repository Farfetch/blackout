import type {
  CheckoutOrder,
  DeliveryBundle,
  DeliveryBundleUpgrade,
  ItemDeliveryProvisioning,
} from '.';
import type { Config } from '../../types';

export type GetCheckoutOrderDeliveryBundleUpgradeProvisioning = (
  checkoutOrderId: CheckoutOrder['id'],
  deliveryBundleId: DeliveryBundle['id'],
  upgradeId: DeliveryBundleUpgrade['id'],
  config?: Config,
) => Promise<ItemDeliveryProvisioning[]>;
