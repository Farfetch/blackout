import type { Config } from '../../types';

export interface City {
  id: number;
  name: string;
  stateId?: number;
  countryId?: number;
}
export interface Cities {
  [index: number]: City;
}

export type GetCountryCities = (
  countryCode: string,
  stateId: number,
  config?: Config,
) => Promise<Cities>;
