import type { Charge, PaymentIntent } from '.';
import type { Config } from '../../types';

export type GetPaymentIntentCharge = (
  paymentIntentId: PaymentIntent['id'],
  chargeId: Charge['id'],
  config?: Config,
) => Promise<Charge>;
