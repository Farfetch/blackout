import type { Config } from '../../types';

export type State = {
  code?: string;
  countryId: number;
  id: number;
  name: string;
};

export type GetCountryStatesResponse = {
  items: State[];
};

export type GetCountryStates = (
  countryCode: string,
  config?: Config,
) => Promise<GetCountryStatesResponse>;
