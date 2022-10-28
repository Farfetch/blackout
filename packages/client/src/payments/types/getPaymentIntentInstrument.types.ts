import type { Config } from '../../types';
import type { PaymentInstrument, PaymentIntent } from '.';

export type GetPaymentIntentInstrument = (
  paymentIntentId: PaymentIntent['id'],
  paymentInstrumentId: PaymentInstrument['id'],
  config?: Config,
) => Promise<PaymentInstrument>;
