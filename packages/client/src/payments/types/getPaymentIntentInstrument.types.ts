import type { Config } from '../../types/index.js';
import type { PaymentInstrument, PaymentIntent } from './index.js';

export type GetPaymentIntentInstrument = (
  paymentIntentId: PaymentIntent['id'],
  paymentInstrumentId: PaymentInstrument['id'],
  config?: Config,
) => Promise<PaymentInstrument>;
