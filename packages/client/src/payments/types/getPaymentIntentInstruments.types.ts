import type { Config } from '../../types';
import type { PaymentInstrument, PaymentIntent } from '.';

export type GetPaymentIntentInstruments = (
  intentId: PaymentIntent['id'],
  config?: Config,
) => Promise<PaymentInstrument[]>;
