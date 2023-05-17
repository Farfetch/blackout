import type { Config } from '../../types/index.js';
import type { PaymentIntent } from './index.js';

export type GetPaymentIntent = (
  paymentIntentId: PaymentIntent['id'],
  config?: Config,
) => Promise<PaymentIntent>;
