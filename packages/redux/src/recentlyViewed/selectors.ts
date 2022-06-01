import { getError, getIsLoading, getResult } from './reducer';
import get from 'lodash/get';
import type {
  RecentlyViewedResult,
  State as RecentlyViewedState,
} from './types';
import type { StoreState } from '../types';

/**
 * Check if recently viewed products request has an error.
 *
 * @param state - Application state.
 *
 * @returns Recently viewed products error.
 */
export const getRecentlyViewedProductsError = (
  state: StoreState,
): RecentlyViewedState['error'] => getError(state.recentlyViewed);

/**
 * Check if recently viewed products are loading.
 *
 * @param state - Application state.
 *
 * @returns If the recently viewed products are loading or not.
 */
export const areRecentlyViewedProductsLoading = (
  state: StoreState,
): RecentlyViewedState['isLoading'] => getIsLoading(state.recentlyViewed);

/**
 * Get all the recently viewed products results previously merged ("remote" and
 * "local" ones).
 *
 * @param state - Application state.
 *
 * @returns The result object containing the recently viewed products.
 */
export const getRecentlyViewedProducts = (
  state: StoreState,
): RecentlyViewedResult['computed'] => getResult(state.recentlyViewed).computed;

/**
 * Returns if the recently viewed products were already fetched or not.
 *
 * @param state - Application state.
 *
 * @returns If the recently viewed products were already fetched.
 */
export const areRecentlyViewedProductsFetched = (
  state: StoreState,
): boolean => {
  const products = getResult(state.recentlyViewed);
  const remoteEntries = get(products, 'remote');

  return remoteEntries !== null;
};

/**
 * Returns the pagination for the recently viewed products.
 *
 * @param state - Application state.
 *
 * @returns The pagination object.
 */
export const getRecentlyViewedProductsPagination = (
  state: StoreState,
): RecentlyViewedResult['pagination'] =>
  getResult(state.recentlyViewed).pagination;
