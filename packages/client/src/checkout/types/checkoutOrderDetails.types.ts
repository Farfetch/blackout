import type { CheckoutOrder, DeliveryBundle, ShippingOption } from '.';

export type CheckoutOrderDetails = {
  checkoutOrder: CheckoutOrder;
  shippingOptions?: ShippingOption[];
  deliveryBundles?: DeliveryBundle[];
  registered: boolean;
};
