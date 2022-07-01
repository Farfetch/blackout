import type { Config } from '../../types';

export type Currency = {
  id: number;
  name: string;
  isoCode: string;
  cultureCode?: string;
  symbol: string;
};

export type Currencies = Currency[];

export type GetCountryCurrencies = (
  countryCode: string,
  config?: Config,
) => Promise<Currencies>;
