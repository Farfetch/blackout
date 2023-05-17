import type { Config } from '../../types/index.js';

export type Currency = {
  id: number;
  name: string;
  isoCode: string;
  cultureCode?: string;
  symbol: string;
};

export type GetCountryCurrencies = (
  countryCode: string,
  config?: Config,
) => Promise<Currency[]>;
