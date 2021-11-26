/**
 * @module categories/selectors
 * @category Categories
 * @subcategory Selectors
 */

import { getError, getIsFetched, getIsLoading } from '../reducer/categories';
import type { Error } from '@farfetch/blackout-client/types';
import type { StoreState } from '../../types';

/**
 * Retrieves the error status of categories.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object | null} Error information (`null` if there are no errors).
 *
 * @example
 * import { getCategoriesError } from '@farfetch/blackout-redux/categories';
 *
 * const mapStateToProps = state => ({
 *     error: getCategoriesError(state)
 * });
 */
export const getCategoriesError = (state: StoreState): Error | null =>
  getError(state.categories);

/**
 * Retrieves the loading state of categories.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} - Loading status of categories.
 *
 * @example
 * import { areCategoriesLoading } from '@farfetch/blackout-redux/categories';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areCategoriesLoading(state)
 * });
 */
export const areCategoriesLoading = (state: StoreState): boolean =>
  getIsLoading(state.categories);

/**
 * Returns the fetched status of categories.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} - If categories are fetched or not.
 *
 * @example
 * import { areCategoriesFetched } from '@farfetch/blackout-redux/categories';
 *
 * const mapStateToProps = state => ({
 *     areCategoriesFetched: areCategoriesFetched(state)
 * });
 */
export const areCategoriesFetched = (state: StoreState): boolean =>
  getIsFetched(state.categories) && !areCategoriesLoading(state);
