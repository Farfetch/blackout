import type {
  CheckoutOrder,
  CheckoutOrderDeliveryBundle,
  CheckoutOrderItemDeliveryProvisioning,
} from './index.js';
import type { Config } from '../../types/index.js';

export type GetCheckoutOrderDeliveryBundleProvisioning = (
  checkoutOrderId: CheckoutOrder['id'],
  deliveryBundleId: CheckoutOrderDeliveryBundle['id'],
  config?: Config,
) => Promise<CheckoutOrderItemDeliveryProvisioning[]>;
