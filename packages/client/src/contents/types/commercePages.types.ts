import type { Contents } from './contents.types';

export type QueryCommercePages = {
  type: string;
  id?: number;
  gender?: number;
  brand?: number;
  category?: string;
  priceType?: string;
  sku?: number;
  pageIndex?: number;
  pageSize?: number;
};

export type CommercePagesContent = {
  number: number;
  totalPages: number;
  totalItems: number;
  entries: Array<Contents>;
};
