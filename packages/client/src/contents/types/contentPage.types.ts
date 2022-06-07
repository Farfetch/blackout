import type { ComponentType } from 'react';
import type { Config, PagedResponse } from '../../types';
import type { ContentEntry } from './contents.types';

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
};

export type ContentPage = PagedResponse<ContentEntry<[ComponentType]>>;

export type GetContentPage = (
  contentPagesType: ContentPageType,
  query: QueryContentPage,
  config?: Config,
) => Promise<ContentPage>;
