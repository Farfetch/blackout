import type {
  Config,
  GetProductListingQuery,
  GetProductSetQuery,
} from '@farfetch/blackout-client';

export enum ProductListingTypes {
  Listing = 'Listing',
  Set = 'Set',
}

export type Slug = string;

export interface UseProductListingCommonOptions {
  useCache?: boolean;
  enableAutoFetch?: boolean;
  setProductsListHash?: boolean;
  fetchConfig?: Config;
}

export interface UseProductListingList extends UseProductListingCommonOptions {
  type?: ProductListingTypes.Listing;
  query?: GetProductListingQuery;
}

export interface UseProductListingSet extends UseProductListingCommonOptions {
  type?: ProductListingTypes.Set;
  query?: GetProductSetQuery;
}

export type UseProductListingOptions =
  | UseProductListingList
  | UseProductListingSet;

export const isSet = (
  options: UseProductListingOptions,
): options is UseProductListingSet => options.type === ProductListingTypes.Set;
