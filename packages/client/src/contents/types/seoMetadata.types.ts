import type { Config } from '../../types';

export type GetSEO = (
  query: GetSEOQuery,
  config?: Config,
) => Promise<SEOMetadata>;

export enum SeoPageType {
  None = 0,
  Default = 1,
  Listing = 2,
  Sets = 3,
  Product = 4,
  Pages = 5,
  Posts = 6,
  Collections = 7,
  Looks = 8,
  LookCollections = 9,
  Stores = 10,
  Custom = 100,
}

export type GetSEOQuery = {
  // The pathname of the location.
  path?: string;
  // The type of the page we are searching (pages|stores...).
  pageType?: SeoPageType;
  // The sub group of pages about products.
  subPageType?: string;
  customContentKey?: string;
  subfolder?: string;
};

export interface HrefLangs {
  rel?: string;
  href: string;
  hrefLang?: string;
}

export type Metatag = {
  property: {
    type: string;
    description: string;
    content: string;
  };
  content: string;
};

export type Metatags = {
  tagName: string;
  propertyType: string;
  propertyDescription: string;
  contentType: string;
  content: string;
};

export type SEOMetadata = {
  title: string | null;
  h1: string | null;
  canonicalUrl: string | null;
  keywords: string | null;
  description: string | null;
  headPrefix: string | null;
  imageAltText?: string | null;
  metatags?: Array<Metatags>;
  hrefLangs?: Array<HrefLangs>;
};
