import { createSelector } from 'reselect';
import { getCategories } from '../../categories/index.js';
import { getError, getIsLoading, getResult } from '../reducer/topCategories.js';
import type { CategoriesState } from '../types/index.js';
import type { CategoryEntity } from '../../entities/index.js';
import type { StoreState } from '../../types/index.js';

/**
 * Retrieves the error status of top categories.
 *
 * @example
 * ```
 * import { getTopCategoriesError } from '@farfetch/blackout-redux';
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
export const getTopCategoriesError = (state: StoreState) =>
  getError(state.categories as CategoriesState);

/**
 * Retrieves a list of all the top categories (without a parent category).
 *
 * @example
 * ```
 * import { getTopCategories } from '@farfetch/blackout-redux';
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
export const getTopCategories: (state: StoreState) => CategoryEntity[] =
  createSelector(
    [
      (state: StoreState) => getResult(state.categories as CategoriesState),
      (state: StoreState) => getCategories(state),
    ],
    (topCategories, categories): CategoryEntity[] => {
      if (!topCategories) {
        return [];
      }

      return topCategories
        .map(id => categories?.[id])
        .filter(Boolean) as CategoryEntity[];
    },
  );

/**
 * Retrieves the loading state of top categories.
 *
 * @example
 * ```
 * import { areTopCategoriesLoading } from '@farfetch/blackout-redux';
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
export const areTopCategoriesLoading = (state: StoreState) =>
  getIsLoading(state.categories as CategoriesState);

/**
 * Returns the fetched status of top categories.
 *
 * @example
 * ```
 * import { areTopCategoriesFetched } from '@farfetch/blackout-redux';
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
export const areTopCategoriesFetched = (state: StoreState) =>
  (!!getResult(state.categories as CategoriesState) ||
    !!getTopCategoriesError(state)) &&
  !areTopCategoriesLoading(state);
