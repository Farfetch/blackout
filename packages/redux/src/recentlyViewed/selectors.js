/**
 * @module recentlyViewed/selectors
 * @category Recently Viewed
 * @subcategory Selectors
 */

import { getError, getIsLoading, getResult } from './reducer';
import get from 'lodash/get';

/**
 * Check if recently viewed products request has an error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object | undefined} Recently viewed products error.
 */
export const getRecentlyViewedProductsError = state =>
  getError(state.recentlyViewed);

/**
 * Check if recently viewed products are loading.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} If the recently viewed products are loading or not.
 */
export const areRecentlyViewedProductsLoading = state =>
  getIsLoading(state.recentlyViewed);

/**
 * Get all the recently viewed products results previously merged ("remote" and "local" ones).
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array} The result object containing the recently viewed products.
 */
export const getRecentlyViewedProducts = state =>
  getResult(state.recentlyViewed).computed;

/**
 * Returns if the recently viewed products were already fetched or not.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} If the recently viewed products were already fetched.
 */
export const areRecentlyViewedProductsFetched = state => {
  const products = getResult(state.recentlyViewed);
  const remoteEntries = get(products, 'remote');

  return remoteEntries !== null;
};

/**
 * Returns the pagination for the recently viewed products.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} The pagination object.
 */
export const getRecentlyViewedProductsPagination = state =>
  getResult(state.recentlyViewed).pagination;
