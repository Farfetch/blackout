import { getError, getIsLoading } from '../reducer/grouping';
import type { ProductEntity } from '../../entities/types';
import type { ProductsState } from '../types';
import type { StoreState } from '../../types';

/**
 * Returns the loading grouping condition to a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If the product grouping is loading or not.
 */
export const isProductGroupingLoading = (
  state: StoreState,
  id: ProductEntity['id'],
  hash: string,
) => getIsLoading((state.products as ProductsState).grouping)[id]?.[hash];

/**
 * Returns the fetched status of a specific product grouping.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If a certain product grouping has been fetched or not.
 */
export const isProductGroupingFetched = (
  state: StoreState,
  id: ProductEntity['id'],
  hash: string,
) =>
  getIsLoading((state.products as ProductsState).grouping)?.[
    id
  ]?.hasOwnProperty(hash) &&
  isProductGroupingLoading(state, id, hash) === false;

/**
 * Returns the error grouping condition to a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns The grouping error associated to a specific product.
 */
export const getProductGroupingError = (
  state: StoreState,
  id: ProductEntity['id'],
  hash: string,
) => getError((state.products as ProductsState).grouping)[id]?.[hash];

/**
 * Returns the grouping for a given product id.
 *
 * @param state - Application state.
 * @param id    - Product id.
 * @param hash  - Hash built with query params.
 *
 * @returns The grouping indexed with a hash for a given product id.
 */
export const getProductGrouping = (
  state: StoreState,
  id: ProductEntity['id'],
  hash: string,
) => (state.products as ProductsState).grouping?.results?.[id]?.[hash];
