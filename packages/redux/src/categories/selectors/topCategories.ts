import { createSelector } from 'reselect';
import { getCategories } from '../../entities';
import { getError, getIsLoading, getResult } from '../reducer/topCategories';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { Category } from '@farfetch/blackout-client/categories/types';
import type { StoreState } from '../../types';

/**
 * Retrieves the error status of top categories.
 *
 * @example
 * ```
 * import { getTopCategoriesError } from '@farfetch/blackout-redux/categories';
 *
 * const mapStateToProps = state => ({
 *     error: getTopCategoriesError(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Error information (`null` if there are no errors).
 */
export const getTopCategoriesError = (
  state: StoreState,
): BlackoutError | null => getError(state.categories);

/**
 * Retrieves a list of all the top categories (without a parent category).
 *
 * @example
 * ```
 * import { getTopCategories } from '@farfetch/blackout-redux/categories';
 *
 * const mapStateToProps = state => ({
 *     topCategories: getTopCategories(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - Top categories list.
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
 * @example
 * ```
 * import { areTopCategoriesLoading } from '@farfetch/blackout-redux/categories';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areTopCategoriesLoading(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - Loading status of categories.
 */
export const areTopCategoriesLoading = (state: StoreState): boolean =>
  getIsLoading(state.categories);

/**
 * Returns the fetched status of top categories.
 *
 * @example
 * ```
 * import { areTopCategoriesFetched } from '@farfetch/blackout-redux/categories';
 *
 * const mapStateToProps = state => ({
 *     areTopCategoriesFetched: areTopCategoriesFetched(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - If top categories are fetched or not.
 */
export const areTopCategoriesFetched = (state: StoreState): boolean =>
  getResult(state.categories) !== null;
