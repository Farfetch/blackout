import type {
  CheckoutOrder,
  DeliveryBundle,
  ItemDeliveryProvisioning,
} from './index.js';
import type { Config } from '../../types/index.js';

export type GetCheckoutOrderDeliveryBundleProvisioning = (
  checkoutOrderId: CheckoutOrder['id'],
  deliveryBundleId: DeliveryBundle['id'],
  config?: Config,
) => Promise<ItemDeliveryProvisioning[]>;
