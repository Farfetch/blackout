import type { Config } from '../../types';
import type { PaymentIntent } from '.';

export type GetPaymentIntent = (
  paymentIntentId: PaymentIntent['id'],
  config?: Config,
) => Promise<PaymentIntent>;
