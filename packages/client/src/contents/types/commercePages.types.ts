import type { Config, GenderEnum } from '../../types';
import type { ContentEntries } from './contents.types';
import type { PriceTypeEnum } from '../../products/types';

export enum Type {
  PRODUCT = 'PRODUCT',
  LISTING = 'LISTING',
  SET = 'SET',
}

export type QueryCommercePages = {
  type: Type;
  id?: number;
  gender?: GenderEnum;
  brand?: number;
  category?: string;
  priceType?: PriceTypeEnum;
  sku?: number;
  pageIndex?: number;
  pageSize?: number;
};

export type CommercePagesContent = Array<ContentEntries>;

export type CommercePages = {
  number: number;
  totalPages: number;
  totalItems: number;
  entries: CommercePagesContent;
};

export type GetCommercePages = (
  query: QueryCommercePages,
  config?: Config,
) => Promise<CommercePagesContent>;
