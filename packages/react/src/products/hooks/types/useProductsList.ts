import type {
  GetProductListingQuery,
  GetProductSetQuery,
} from '@farfetch/blackout-client';
import type {
  ProductEntity,
  ProductsListEntity,
} from '@farfetch/blackout-redux';

export type ProductsListTypes = {
  LISTING: 'listing';
  SET: 'set';
};

export type UseProductsListParams = {
  // The query parameters of the given product list.
  query: GetProductListingQuery | GetProductSetQuery;
  // Wether to set the reducer's hash on the store when requesting a product list.
  setProductsListHash?: boolean;
  // The slug of the given product list.
  slug: string;
  // Listing type ('listing' or 'set').
  type: ProductsListTypes['LISTING'] | ProductsListTypes['SET'];
  // To use cache when fetching a product list.
  useCache?: boolean;
};

export type UseProductsList = ({
  query,
  setProductsListHash,
  slug,
  type,
  useCache,
}: UseProductsListParams) => {
  error: Error | undefined;
  isFetched: boolean | undefined;
  isLoading: boolean | undefined;
  products: ProductEntity[];
  productsListHash: string;
  result: ProductsListEntity | undefined;
};
