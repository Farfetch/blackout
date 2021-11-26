import type { GenderString } from '../../types';

export type Designers = [
  {
    title: string;
    slug: string;
    gender: GenderString;
    list: {
      title: string;
      description: string;
      image: string;
      slug: string;
      slugSuffix: null;
    }[];
  },
];

export type DesignersResponse = {
  designers: Designers;
  // FO stuff (`designers` is a legacy endpoint)
  baseUrl?: string;
  clientOnlyPage?: boolean;
  components?: Record<string, unknown>;
  countryCode?: string;
  countryId?: number;
  cultureCode?: string;
  currencyCode?: string;
  currencyCultureCode?: string;
  dataLayer?: Record<string, unknown>;
  isMobileDevice?: boolean;
  newsletterSubscriptionOptionDefault?: boolean;
  pageContent?: Record<string, unknown>;
  pageType?: string;
  redirectUrl?: string;
  relativeUrl?: string;
  requestSourceCountryCode?: string;
  returnUrl?: string;
  screenPixelsHeight?: number;
  screenPixelsWidth?: number;
  seoMetadata?: Record<string, unknown>;
  seoPageType?: number;
  serverSideJsApp?: string;
  siteKeys?: Record<string, unknown>;
  slug?: string;
  staticPath?: string;
  subfolder?: string;
  translationsUrl?: string;
  view?: string;
};
