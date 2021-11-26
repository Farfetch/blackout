import type { Config } from '../../types';

export interface State {
  code?: string;
  countryId: number;
  id: number;
  name: string;
}

export interface States {
  [index: number]: State;
}

export type GetCountryStates = (
  countryCode: string,
  config?: Config,
) => Promise<States>;
