import type { Config } from '../../types';
import type { PaymentInstrument, PaymentIntent } from '.';

export type DeletePaymentIntentInstrument = (
  paymentIntentId: PaymentIntent['id'],
  paymentInstrumentId: PaymentInstrument['id'],
  config?: Config,
) => void;
