import type { Config } from '../../types/index.js';
import type { PaymentIntent, PaymentMethods } from './index.js';

export type GetPaymentMethodsByIntent = (
  paymentIntentId: PaymentIntent['id'],
  config?: Config,
) => Promise<PaymentMethods>;
