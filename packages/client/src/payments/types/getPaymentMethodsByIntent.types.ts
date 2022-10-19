import type { Config } from '../../types';
import type { PaymentIntent, PaymentMethods } from '.';

export type GetPaymentMethodsByIntent = (
  intentId: PaymentIntent['id'],
  config?: Config,
) => Promise<PaymentMethods>;
