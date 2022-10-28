import type { Config } from '../../types';
import type { PaymentIntent, PaymentMethods } from '.';

export type GetPaymentMethodsByIntent = (
  paymentIntentId: PaymentIntent['id'],
  config?: Config,
) => Promise<PaymentMethods>;
