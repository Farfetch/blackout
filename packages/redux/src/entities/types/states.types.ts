import type { City, State } from '@farfetch/blackout-client';

export type StateNormalized = State & {
  cities?: Array<City['id']>;
};
