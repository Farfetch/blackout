import type {
  Config,
  GetProductListingQuery,
  GetProductSetQuery,
} from '@farfetch/blackout-client';

export enum ProductListingType {
  Listing = 'Listing',
  Set = 'Set',
}

export type Slug = string;

export interface UseProductListingCommonOptions {
  useCache?: boolean;
  enableAutoFetch?: boolean;
  setProductsListHash?: boolean;
  isCustomListingPage?: boolean;
  fetchConfig?: Config;
}

export interface UseProductListingTypeListingOptions
  extends UseProductListingCommonOptions {
  type?: ProductListingType.Listing;
  query?: GetProductListingQuery;
}

export interface UseProductListingTypeSetOptions
  extends UseProductListingCommonOptions {
  type?: ProductListingType.Set;
  query?: GetProductSetQuery;
}

export type UseProductListingOptions =
  | UseProductListingTypeListingOptions
  | UseProductListingTypeSetOptions;
