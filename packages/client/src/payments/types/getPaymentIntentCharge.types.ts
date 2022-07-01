import type { Charge, PaymentIntent } from '.';
import type { Config } from '../../types';

export type GetPaymentIntentCharge = (
  intentId: PaymentIntent['id'],
  chargeId: string,
  config?: Config,
) => Promise<Charge>;
