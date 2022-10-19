import type { Charge, PaymentIntent } from '.';
import type { Config } from '../../types';

export type GetPaymentIntentCharge = (
  intentId: PaymentIntent['id'],
  chargeId: Charge['id'],
  config?: Config,
) => Promise<Charge>;
