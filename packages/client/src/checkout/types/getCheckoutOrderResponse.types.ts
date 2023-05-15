import type {
  CheckoutOrder,
  CheckoutOrderDeliveryBundle,
  CheckoutOrderShippingOption,
} from './index.js';
import type {
  PaymentMethods,
  PaymentToken,
} from '../../payments/types/index.js';

export enum OrderStatusError {
  NoError,
  AddressesError,
  ShippingOptionsError,
  DeliveryBundleError,
  Recovered,
  Recoverable,
}

export type GetCheckoutOrderResponse = {
  id: CheckoutOrder['id'];
  checkoutOrder?: CheckoutOrder;
  shippingOptions?: CheckoutOrderShippingOption[];
  deliveryBundles?: CheckoutOrderDeliveryBundle[];
  paymentMethods?: PaymentMethods;
  userPaymentTokens?: PaymentToken[];
  paymentRequestId?: string;
  orderStatus: OrderStatusError;
};
