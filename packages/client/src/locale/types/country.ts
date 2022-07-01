import type { Config } from '../../types';
import type { Currencies } from './currencies';

export interface Country {
  code: string;
  name: string;
  nativeName: string;
  structures: string[];
  platformId?: number;
  cultureCode: string;
  isDefault?: boolean;
  newsletterSubscriptionOptionDefault?: boolean;
  isCountryDefault?: boolean;
  continentId: number;
  currencies?: Currencies;
  cultures: string[];
  defaultSubfolder: string;
  defaultCulture: string;
}

export type GetCountry = (
  // The current page.
  countryCode: string,
  // Size of each page, as a number.
  config?: Config,
) => Promise<Country>;
