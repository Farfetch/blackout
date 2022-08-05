import type { City, Country, State } from '@farfetch/blackout-client';

export type CountryNormalized = Country & {
  states?: Array<State['id']>;
  cities?: Array<City['id']>;
};
