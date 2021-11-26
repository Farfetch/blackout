import type { Config } from '../../types';
import type { Country } from './country';
import type { LocaleQuery } from './query';

export interface Countries {
  [index: number]: Country;
}

export type GetCountries = (
  query?: LocaleQuery,
  config?: Config,
) => Promise<Countries>;
