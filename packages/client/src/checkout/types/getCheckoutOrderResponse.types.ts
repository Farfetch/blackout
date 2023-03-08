import type { CheckoutOrder, DeliveryBundle, ShippingOption } from './index.js';
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
