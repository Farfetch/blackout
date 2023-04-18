import { getError, getIsLoading } from '../reducer/grouping.js';
import generateProductGroupingHash from '../utils/generateProductGroupingHash.js';
import type { GetProductGroupingQuery } from '@farfetch/blackout-client';
import type { ProductEntity } from '../../entities/types/index.js';
import type { ProductsState } from '../types/index.js';
import type { StoreState } from '../../types/index.js';

/**
 * Returns the loading grouping condition to a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 * @param query - Get product grouping query.
 *
 * @returns If the product grouping is loading or not.
 */
export const isProductGroupingLoading = (
  state: StoreState,
  id: ProductEntity['id'],
  query?: GetProductGroupingQuery,
) => {
  const hash = generateProductGroupingHash(query);

  return getIsLoading((state.products as ProductsState).grouping)[id]?.[hash];
};

/**
 * Returns the fetched status of a specific product grouping.
 *
 * @param state - Application state.
 * @param id    - Product id.
 * @param query - Get product grouping query.
 *
 * @returns If a certain product grouping has been fetched or not.
 */
export const isProductGroupingFetched = (
  state: StoreState,
  id: ProductEntity['id'],
  query?: GetProductGroupingQuery,
) => {
  const hash = generateProductGroupingHash(query);

  return (
    getIsLoading((state.products as ProductsState).grouping)?.[
      id
    ]?.hasOwnProperty(hash) &&
    isProductGroupingLoading(state, id, query) === false
  );
};

/**
 * Returns the error grouping condition to a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 * @param query - Get product grouping query.
 *
 * @returns The grouping error associated to a specific product.
 */
export const getProductGroupingError = (
  state: StoreState,
  id: ProductEntity['id'],
  query?: GetProductGroupingQuery,
) => {
  const hash = generateProductGroupingHash(query);

  return getError((state.products as ProductsState).grouping)[id]?.[hash];
};

/**
 * Returns the grouping for a given product id.
 *
 * @param state - Application state.
 * @param id    - Product id.
 * @param query - Get product grouping query.
 *
 * @returns The product grouping corresponding to the product id and query parameters.
 */
export const getProductGrouping = (
  state: StoreState,
  id: ProductEntity['id'],
  query?: GetProductGroupingQuery,
) => {
  const hash = generateProductGroupingHash(query);

  return (state.products as ProductsState).grouping?.results?.[id]?.[hash];
};
