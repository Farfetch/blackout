import type { Config } from '../../types';
import type { PaymentInstrument, PaymentIntent } from '.';

export type GetPaymentIntentInstrument = (
  intentId: PaymentIntent['id'],
  instrumentId: PaymentInstrument['id'],
  config?: Config,
) => Promise<PaymentInstrument>;
