import type { Config } from '../../types';

export interface Currencies {
  [index: number]: {
    id: number;
    name: string;
    isoCode: string;
    cultureCode?: string;
    [k: string]: any;
  };
}

export type GetCountryCurrencies = (
  countryCode: string,
  config?: Config,
) => Promise<Currencies>;
