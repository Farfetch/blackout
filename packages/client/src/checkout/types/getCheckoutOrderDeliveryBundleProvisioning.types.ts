import type {
  CheckoutOrder,
  DeliveryBundle,
  ItemDeliveryProvisioning,
} from '.';
import type { Config } from '../../types';

export type GetCheckoutOrderDeliveryBundleProvisioning = (
  checkoutOrderId: CheckoutOrder['id'],
  deliveryBundleId: DeliveryBundle['id'],
  config?: Config,
) => Promise<ItemDeliveryProvisioning[]>;
