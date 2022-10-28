import type { Config } from '../../types';
import type { PaymentInstrument, PaymentIntent } from '.';

export type GetPaymentIntentInstruments = (
  paymentIntentId: PaymentIntent['id'],
  config?: Config,
) => Promise<PaymentInstrument[]>;
