import type {
  Contents,
  GenderDescription,
  Product,
  ProductListing,
  ProductSet,
  QuerySearchContents,
  SEOMetadata,
} from '@farfetch/blackout-client';

export type Designers = {
  title: string;
  slug: string;
  gender: GenderDescription;
  list: {
    title: string;
    description: string;
    image: string;
    slug: string;
    slugSuffix: null;
  }[];
}[];

type Common = {
  countryCode: string;
  countryId: number;
  cultureCode: string;
  currencyCode: string;
  currencyCultureCode: string;
  designers: Designers;
  newsletterSubscriptionOptionDefault: boolean;
  requestSourceCountryCode: string;
  defaultCulture: string;
  defaultSubfolder: string;
  pageType: string;
  searchContentRequests: [
    {
      filters: QuerySearchContents;
      searchResponse: Contents;
    },
  ];
  slug: string;
  subfolder: string;
};

export type Model = ProductListing &
  ProductSet &
  Product &
  Common & { seoMetadata: SEOMetadata };
