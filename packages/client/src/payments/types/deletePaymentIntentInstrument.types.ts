import type { Config } from '../../types';
import type { PaymentInstrument, PaymentIntent } from '.';

export type DeletePaymentIntentInstrument = (
  intentId: PaymentIntent['id'],
  instrumentId: PaymentInstrument['id'],
  config?: Config,
) => void;
