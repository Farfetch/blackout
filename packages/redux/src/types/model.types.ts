import type {
  Contents,
  GenderDescription,
  Listing,
  Product,
  QueryContents,
  Set,
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
