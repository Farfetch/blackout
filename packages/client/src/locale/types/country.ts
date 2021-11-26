import type { Config } from '../../types';
import type { Currencies } from './currencies';

export interface Country {
  code: string;
  structure?: string;
  platformId?: number;
  cultureCode: string;
  isDefault?: boolean;
  newsletterSubscriptionOptionDefault?: boolean;
  isCountryDefault?: boolean;
  continentId: number;
  currencies?: Currencies;
}

export type GetCountry = (
  countryCode: string,
  config?: Config,
) => Promise<Country>;
