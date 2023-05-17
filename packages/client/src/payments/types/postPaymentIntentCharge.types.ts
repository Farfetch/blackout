import type { AxiosResponse } from 'axios';
import type { Config } from '../../types/index.js';
import type { PaymentIntent, PaymentIntentCharge } from './index.js';

export type PostPaymentIntentChargeData = {
  returnUrl: string;
  cancelUrl: string;
};

export type PostPaymentIntentChargeResponse =
  AxiosResponse<PaymentIntentCharge>;

export type PostPaymentIntentCharge = (
  paymentIntentId: PaymentIntent['id'],
  data: PostPaymentIntentChargeData,
  config?: Config,
) => Promise<PostPaymentIntentChargeResponse>;
