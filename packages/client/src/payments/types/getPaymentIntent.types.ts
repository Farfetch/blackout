import type { Config } from '../../types';
import type { PaymentIntent } from '.';

export type GetPaymentIntent = (
  intentId: PaymentIntent['id'],
  config?: Config,
) => Promise<PaymentIntent>;
