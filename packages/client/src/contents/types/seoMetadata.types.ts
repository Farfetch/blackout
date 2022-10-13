import type { Config } from '../../types';

export type GetSEOMetadata = (
  query: GetSEOMetadataQuery,
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

export enum SeoSubPageType {
  Default = 'Default',
  Sale = 'Sale',
  Brand = 'Brand',
  Category = 'Category',
  CategorySale = 'CategorySale',
  BrandSale = 'BrandSale',
  BrandCategory = 'BrandCategory',
  BrandCategorySale = 'BrandCategorySale',
}

export type GetSEOMetadataQuery = {
  // The pathname of the location.
  path?: string;
  // The type of the page we are searching (pages|stores...).
  pageType?: SeoPageType;
  // The sub group of pages about products.
  subPageType?: string;
  customContentKey?: string;
  subfolder?: string;
  param?: Record<string, string | number>;
};

export interface HrefLangs {
  rel?: string;
  href: string;
  hrefLang?: string;
}

export type Metatag = {
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
  metatags?: Array<Metatag>;
  hrefLangs?: Array<HrefLangs>;
};
