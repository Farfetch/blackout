import { get } from 'lodash-es';
import {
  getError,
  getIsLoading,
  getResult,
} from '../reducer/recentlyViewedProducts.js';
import type { StoreState } from '../../types/index.js';

/**
 * Check if recently viewed products request has an error.
 *
 * @param state - Application state.
 *
 * @returns Recently viewed products error.
 */
export const getRecentlyViewedProductsError = (state: StoreState) =>
  getError(state.products?.recentlyViewed);

/**
 * Check if recently viewed products are loading.
 *
 * @param state - Application state.
 *
 * @returns If the recently viewed products are loading or not.
 */
export const areRecentlyViewedProductsLoading = (state: StoreState) =>
  getIsLoading(state.products?.recentlyViewed);

/**
 * Get all the recently viewed products results previously merged ("remote" and
 * "local" ones).
 *
 * @param state - Application state.
 *
 * @returns The result object containing the recently viewed products.
 */
export const getRecentlyViewedProducts = (state: StoreState) =>
  getResult(state.products?.recentlyViewed)?.computed;

/**
 * Returns if the recently viewed products were already fetched or not.
 *
 * @param state - Application state.
 *
 * @returns If the recently viewed products were already fetched.
 */
export const areRecentlyViewedProductsFetched = (state: StoreState) => {
  const products = getResult(state.products?.recentlyViewed);
  const remoteEntries = get(products, 'remote');

  return (
    (!!remoteEntries || !!getRecentlyViewedProductsError(state)) &&
    !areRecentlyViewedProductsLoading(state)
  );
};

/**
 * Returns the pagination for the recently viewed products.
 *
 * @param state - Application state.
 *
 * @returns The pagination object.
 */
export const getRecentlyViewedProductsPagination = (state: StoreState) =>
  getResult(state.products?.recentlyViewed)?.pagination;
