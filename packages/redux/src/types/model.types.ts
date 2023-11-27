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
    contentSlug: string | null;
    description: string | null;
    id: number;
    image: string | null;
    overrideUrl: string | null;
    slug: string;
    slugSuffix: string | null;
    tags: Array<string>;
    title: string;
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
  dataLayer?: {
    general?: {
      type: string;
      currency: string;
      country: string;
      culture: string;
    } | null;
  };
};

export type RelatedCommerceData = {
  referencedListing: [ProductListing & { explanation?: string }];
  referencedSets: [];
  referencedBrands: [];
  referencedCategories: [];
  referencedProducts: [];
};

export type Model = ProductListing &
  ProductSet &
  Product &
  Common & { relatedCommerceData: RelatedCommerceData } & {
    seoMetadata: SEOMetadata;
  };
