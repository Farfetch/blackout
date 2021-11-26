import type { Instrument } from '@farfetch/blackout-client/payments/types';

export type InstrumentsEntity =
  | Record<Instrument['id'], Instrument>
  | undefined;
