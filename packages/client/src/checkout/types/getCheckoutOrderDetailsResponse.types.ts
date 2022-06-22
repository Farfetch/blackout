import type { CheckoutOrder, DeliveryBundle, ShippingOption } from '.';

export type GetCheckoutOrderDetailsResponse = {
  checkoutOrder: CheckoutOrder;
  shippingOptions?: ShippingOption[];
  deliveryBundles?: DeliveryBundle[];
  registered: boolean;
};
