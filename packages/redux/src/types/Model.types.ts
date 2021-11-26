import type {
  Contents,
  QueryContents,
} from '@farfetch/blackout-client/contents/types';
import type { Designers } from '@farfetch/blackout-client/designers/types';
import type {
  Listing,
  Product,
} from '@farfetch/blackout-client/products/types';

export type Model = Listing &
  Product & {
    countryCode: string;
    countryId: number;
    cultureCode: string;
    currencyCode: string;
    currencyCultureCode: string;
    designers: Designers;
    newsletterSubscriptionOptionDefault: boolean;
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
