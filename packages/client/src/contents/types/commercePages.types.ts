import type { Config, Gender } from '../../types';
import type { ContentEntries } from './contents.types';
import type { PriceType } from '../../products/types';

export enum Type {
  PRODUCT = 'PRODUCT',
  LISTING = 'LISTING',
  SET = 'SET',
}

export type QueryCommercePages = {
  // Query by a page type.
  type: Type;
  // Query by a specified product or set identifier.
  id?: number;
  // Query by a gender (E.g. 0 = Woman, 1 = Man, 2 = Unisex, 3 = Kid).
  gender?: Gender;
  // Query by a specified brand identifier.
  brand?: number;
  // Query by a specified category identifiers, separated by commas (E.g. 139065,139088).
  category?: string;
  // Query by a specified price type, separated by commas (E.g. 0,1,2).
  priceType?: PriceType;
  // Query by a specified sku identifier.
  sku?: number;
  // Number of the page to get, starting at 1. The default is 1.
  pageIndex?: number;
  // Size of each page, as a number between 1 and 180. The default is 60.
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
