import type { CheckoutOrder, DeliveryBundle, ShippingOption } from '.';

export type GetCheckoutDetailsResponse = {
  checkoutOrder: CheckoutOrder;
  shippingOptions?: ShippingOption[];
  deliveryBundles?: DeliveryBundle[];
  registered: boolean;
};
