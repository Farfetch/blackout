import type {
  Contents,
  QueryContents,
} from '@farfetch/blackout-client/contents/types';
import type { Designers } from '@farfetch/blackout-client/designers/types';
import type { Listing, Product, Set } from '@farfetch/blackout-client';

type Common = {
  countryCode: string;
  countryId: number;
  cultureCode: string;
  currencyCode: string;
  currencyCultureCode: string;
  designers: Designers;
  newsletterSubscriptionOptionDefault: boolean;
  sourceCountryCode: string;
  defaultCulture: string;
  defaultSubfolder: string;
  pageType: string;
  searchContentRequests: [
    {
      filters: QueryContents;
      searchResponse: Contents;
    },
  ];
  slug: string;
  subfolder: string;
};

export type Model = Listing & Set & Product & Common;
