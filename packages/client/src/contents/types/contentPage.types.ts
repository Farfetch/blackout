import type { ComponentType, ContentEntry } from './contents.types.js';
import type { Config, PagedResponse } from '../../types/index.js';

export enum ContentPageType {
  Product = 'PRODUCT',
  Listing = 'LISTING',
  Set = 'SET',
}

export enum ContentPageStrategy {
  Default = 'default',
  Merge = 'merge',
}

export type QueryContentPage = {
  slug: string;
  strategy?: ContentPageStrategy;
  // Query by a specified Benefit, separated by commas.
  'target.benefits'?: string;
  // Query by a specified Segment, separated by commas.
  'target.segments'?: string;
};

export type ContentPage = PagedResponse<ContentEntry<[ComponentType]>>;

export type GetContentPage = (
  contentPageType: ContentPageType,
  query: QueryContentPage,
  config?: Config,
) => Promise<ContentPage>;
