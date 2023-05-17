import type { Config } from '../../types/index.js';

export type City = {
  id: number;
  name: string;
  stateId?: number;
  countryId?: number;
};

export type GetCountryStateCities = (
  countryCode: string,
  stateId: number,
  config?: Config,
) => Promise<City[]>;
