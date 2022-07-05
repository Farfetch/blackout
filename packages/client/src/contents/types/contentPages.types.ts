import type { Config } from '../../types';
import type { ContentEntries } from './contents.types';

export enum ContentType {
  PRODUCT = 'PRODUCT',
  LISTING = 'LISTING',
  SET = 'SET',
}

export type QueryContentPages = {
  slug: string;
  strategy?: string;
};

export type ContentPagesContent = Array<ContentEntries>;

export type ContentPages = {
  number: number;
  totalPages: number;
  totalItems: number;
  entries: ContentPagesContent;
};

export type GetContentPages = (
  contentType: ContentType,
  query: QueryContentPages,
  config?: Config,
) => Promise<ContentPages>;
