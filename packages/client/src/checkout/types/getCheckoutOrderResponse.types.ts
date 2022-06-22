import type {
  CheckoutOrder,
  DeliveryBundle,
  PaymentMethods,
  ShippingOption,
  UserPaymentToken,
} from '.';

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
  userPaymentTokens?: UserPaymentToken[];
  paymentRequestId?: string;
  orderStatus: OrderStatusError;
};
