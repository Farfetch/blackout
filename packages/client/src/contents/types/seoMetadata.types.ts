import type { Config } from '../../types';

export type GetSEO = (query: QuerySEO, config?: Config) => Promise<SEOMetadata>;

export type QuerySEO = {
  pageType: string;
  param: string;
  path: string;
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
  title?: string;
  h1?: string;
  canonicalUrl?: string;
  keywords?: string;
  description?: string;
  headPrefix?: string;
  imageAltText?: string;
  metatags?: Array<Metatags>;
  hrefLangs?: Array<HrefLangs>;
};
