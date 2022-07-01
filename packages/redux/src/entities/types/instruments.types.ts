import type { PaymentInstrument } from '@farfetch/blackout-client';

export type PaymentInstrumentsEntity =
  | Record<PaymentInstrument['id'], PaymentInstrument>
  | undefined;
