import type { Config } from '../../types/index.js';
import type { PaymentInstrument, PaymentIntent } from './index.js';

export type GetPaymentIntentInstruments = (
  paymentIntentId: PaymentIntent['id'],
  config?: Config,
) => Promise<PaymentInstrument[]>;
