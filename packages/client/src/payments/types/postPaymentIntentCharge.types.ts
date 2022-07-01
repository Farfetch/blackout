import type { Config } from '../../types';
import type { PaymentIntent, PostPaymentIntentChargeResponse } from '.';

export type PostPaymentIntentChargeData = {
  returnUrl: string;
  cancelUrl: string;
};

export type PostPaymentIntentCharge = (
  id: PaymentIntent['id'],
  data: PostPaymentIntentChargeData,
  config?: Config,
) => Promise<PostPaymentIntentChargeResponse>;
