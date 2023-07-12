import type { CheckoutAddress, Config } from '../../types/index.js';
import type { PaymentIntent } from './paymentIntent.types.js';

export type PostPaymentSessionForCheckoutData = {
  paymentIntentId: PaymentIntent['id'];
};

export type PostPaymentSessionForCardTokenData = {
  shippingAddresses: CheckoutAddress[];
  billingAddress: CheckoutAddress;
  redirectUrl: string;
};

export type PostPaymentSessionData =
  | PostPaymentSessionForCheckoutData
  | PostPaymentSessionForCardTokenData;

export type PaymentSession = {
  id: string;
  paymentUrl: string;
  expiresIn: number;
};

export type PostPaymentSession = (
  data: PostPaymentSessionData,
  config?: Config,
) => Promise<PaymentSession>;
