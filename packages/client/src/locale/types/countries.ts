import type { Config, PagedResponse } from '../../types';
import type { Country } from './country';
import type { LocaleQuery } from './query';

export type Countries = PagedResponse<Country>;

export type GetCountries = (
  query?: LocaleQuery,
  config?: Config,
) => Promise<Countries>;
