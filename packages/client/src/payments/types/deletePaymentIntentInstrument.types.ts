import type { Config } from '../../types/index.js';
import type { PaymentInstrument, PaymentIntent } from './index.js';

export type DeletePaymentIntentInstrument = (
  paymentIntentId: PaymentIntent['id'],
  paymentInstrumentId: PaymentInstrument['id'],
  config?: Config,
) => void;
