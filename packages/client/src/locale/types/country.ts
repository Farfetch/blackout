import type { Config } from '../../types/index.js';
import type { Currency } from './currencies.js';

export type Country = {
  code: string;
  name: string;
  nativeName: string;
  structures: string[];
  platformId?: number;
  isDefault?: boolean;
  newsletterSubscriptionOptionDefault?: boolean;
  isCountryDefault?: boolean;
  continentId: number;
  currencies?: Currency[];
  cultures: string[];
  defaultSubfolder: string;
  defaultCulture: string;
};

export type GetCountry = (
  // The current page.
  countryCode: string,
  // Size of each page, as a number.
  config?: Config,
) => Promise<Country>;
