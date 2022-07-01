import type { Config } from '../../types';

export type GetSEO = (query: QuerySEO, config?: Config) => Promise<SEOMetadata>;

export type QuerySEO = {
  // The type of the page we are searching (pages|stories...).
  pageType: string;
  // An object containing some parameters for product listing (BrandName|CategoryName|TotalNumberItems...).
  param?: string;
  // The pathname of the location.
  path: string;
  // The sub group of pages about products.
  subPageType: string;
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
