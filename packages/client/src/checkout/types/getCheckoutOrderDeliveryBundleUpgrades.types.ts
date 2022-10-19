import type { CheckoutOrder, DeliveryBundle, DeliveryBundleUpgrades } from '.';
import type { Config } from '../../types';

export type GetCheckoutOrderDeliveryBundleUpgrades = (
  checkoutOrderId: CheckoutOrder['id'],
  deliveryBundleId: DeliveryBundle['id'],
  config?: Config,
) => Promise<DeliveryBundleUpgrades>;
