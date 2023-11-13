import type { Config, GenderCode } from '../../types/index.js';
import type { Contents } from './contents.types.js';
import type { PriceType } from '../../products/types/index.js';

export enum CommercePagesType {
  Product = 'PRODUCT',
  Listing = 'LISTING',
  Set = 'SET',
}

export type QueryCommercePages = {
  // Query by a page type.
  type: CommercePagesType;
  // Query by a specified product or set identifier.
  id?: number;
  // Query by a gender (E.g. 0 = Woman, 1 = Man, 2 = Unisex, 3 = Kid).
  gender?: GenderCode;
  // Query by a specified brand identifier.
  brand?: number;
  // Query by a specified category identifiers, separated by commas (E.g. 139065,139088).
  category?: string;
  // Query by a specified price type, separated by commas (E.g. 0,1,2).
  priceType?: PriceType;
  // Query by a specified sku identifier.
  sku?: string;
  // Number of the page to get, starting at 1. The default is 1.
  pageIndex?: number;
  // Size of each page, as a number between 1 and 180. The default is 60.
  pageSize?: number;
  // Query by a specified Benefit, separated by commas.
  'target.benefits'?: string;
  // Query by a specified Segment, separated by commas.
  'target.segments'?: string;
};

export type CommercePages = Contents;

export type CommercePagesContent = CommercePages['entries'];

export type GetCommercePages = (
  query: QueryCommercePages,
  config?: Config,
) => Promise<CommercePages>;
