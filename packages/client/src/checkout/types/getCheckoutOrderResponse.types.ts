import type { CheckoutOrder, DeliveryBundle, ShippingOption } from '.';
import type { PaymentMethods, PaymentToken } from '../../payments/types';

export enum OrderStatusError {
  NoError,
  AddressesError,
  ShippingOptionsError,
  DeliveryBundleError,
  Recovered,
}

export type GetCheckoutOrderResponse = {
  id: number;
  checkoutOrder?: CheckoutOrder;
  shippingOptions?: ShippingOption[];
  deliveryBundles?: DeliveryBundle[];
  paymentMethods?: PaymentMethods;
  userPaymentTokens?: PaymentToken[];
  paymentRequestId?: string;
  orderStatus: OrderStatusError;
};
