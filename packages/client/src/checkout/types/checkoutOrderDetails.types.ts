import type { CheckoutOrder, DeliveryBundle, ShippingOption } from './index.js';

export type CheckoutOrderDetails = {
  checkoutOrder: CheckoutOrder;
  shippingOptions?: ShippingOption[];
  deliveryBundles?: DeliveryBundle[];
  registered: boolean;
};
