import type { Config } from '../../types/index.js';

export type State = {
  code?: string;
  countryId: number;
  id: number;
  name: string;
};

export type GetCountryStates = (
  countryCode: string,
  config?: Config,
) => Promise<State[]>;
