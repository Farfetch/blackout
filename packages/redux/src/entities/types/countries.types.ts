import type { City, Country, State } from '@farfetch/blackout-client';

export interface CountriesEntity extends Country {
  states?: Array<State['id']>;
  cities?: Array<City['id']>;
}
