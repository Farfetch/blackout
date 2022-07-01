import type { Config } from '../../types';

export interface City {
  id: number;
  name: string;
  stateId?: number;
  countryId?: number;
}

export type GetCountryCitiesResponse = {
  items: City[];
};

export type GetCountryCities = (
  countryCode: string,
  stateId: number,
  config?: Config,
) => Promise<GetCountryCitiesResponse>;
