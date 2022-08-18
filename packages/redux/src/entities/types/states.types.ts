import type { City, State } from '@farfetch/blackout-client';

export type StateEntity = State & {
  cities?: Array<City['id']>;
};
