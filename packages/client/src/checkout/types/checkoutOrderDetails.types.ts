import type {
  CheckoutOrder,
  CheckoutOrderDeliveryBundle,
  CheckoutOrderShippingOption,
} from './index.js';

export type CheckoutOrderDetails = {
  checkoutOrder: CheckoutOrder;
  shippingOptions?: CheckoutOrderShippingOption[];
  deliveryBundles?: CheckoutOrderDeliveryBundle[];
  registered: boolean;
};
