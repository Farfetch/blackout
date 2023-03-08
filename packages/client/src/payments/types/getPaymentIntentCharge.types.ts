import type { Charge, PaymentIntent } from './index.js';
import type { Config } from '../../types/index.js';

export type GetPaymentIntentCharge = (
  paymentIntentId: PaymentIntent['id'],
  chargeId: Charge['id'],
  config?: Config,
) => Promise<Charge>;
