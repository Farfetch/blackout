import type { Config } from '../../types';
import type { Country } from './country';
import type { LocaleQuery } from './query';

export type GetCountriesResponse = {
  number: number;
  totalItems: number;
  totalPages: number;
  entries: Country[];
};

export type GetCountries = (
  query?: LocaleQuery,
  config?: Config,
) => Promise<GetCountriesResponse>;
