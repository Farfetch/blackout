/**
 * @module categories/selectors
 * @category Categories
 * @subcategory Selectors
 */

import { createSelector } from 'reselect';
import { getCategories } from '../../entities';
import { getError, getIsLoading, getResult } from '../reducer/topCategories';
import type { Category } from '@farfetch/blackout-client/categories/types';
import type { Error } from '@farfetch/blackout-client/types';
import type { StoreState } from '../../types';

/**
 * Retrieves the error status of top categories.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object | null} Error information (`null` if there are no errors).
 *
 * @example
 * import { getTopCategoriesError } from '@farfetch/blackout-redux/categories';
 *
 * const mapStateToProps = state => ({
 *     error: getTopCategoriesError(state)
 * });
 */
export const getTopCategoriesError = (state: StoreState): Error | null =>
  getError(state.categories);

/**
 * Retrieves a list of all the top categories (without a parent category).
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array} - Top categories list.
 *
 * @example
 * import { getTopCategories } from '@farfetch/blackout-redux/categories';
 *
 * const mapStateToProps = state => ({
 *     topCategories: getTopCategories(state)
 * });
 */
export const getTopCategories = createSelector(
  [
    (state: StoreState) => getResult(state.categories),
    (state: StoreState) => getCategories(state),
  ],
  (topCategories, categories): (Category | undefined)[] => {
    if (!topCategories) {
      return [];
    }

    return topCategories.map(id => categories?.[id]);
  },
);

/**
 * Retrieves the loading state of top categories.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} - Loading status of categories.
 *
 * @example
 * import { areTopCategoriesLoading } from '@farfetch/blackout-redux/categories';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areTopCategoriesLoading(state)
 * });
 */
export const areTopCategoriesLoading = (state: StoreState): boolean =>
  getIsLoading(state.categories);

/**
 * Returns the fetched status of top categories.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} - If top categories are fetched or not.
 *
 * @example
 * import { areTopCategoriesFetched } from '@farfetch/blackout-redux/categories';
 *
 * const mapStateToProps = state => ({
 *     areTopCategoriesFetched: areTopCategoriesFetched(state)
 * });
 */
export const areTopCategoriesFetched = (state: StoreState): boolean =>
  getResult(state.categories) !== null;
