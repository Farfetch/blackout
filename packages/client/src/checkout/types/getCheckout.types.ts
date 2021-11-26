import type { Config } from '../../types';
import type { GetCheckoutResponse } from '.';

export type GetCheckoutQuery = {
  checkoutOrder?: string;
  paymentMethods?: string;
  shippingOptions?: string;
  deliveryBundles?: string;
  userPaymentTokens?: string;
};

export type GetCheckout = (
  id: number,
  query?: GetCheckoutQuery,
  config?: Config,
) => Promise<GetCheckoutResponse>;
