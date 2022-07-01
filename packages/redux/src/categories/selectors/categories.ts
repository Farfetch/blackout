import { getError, getIsFetched, getIsLoading } from '../reducer/categories';
import type { CategoriesState } from '../types';
import type { StoreState } from '../../types';

/**
 * Retrieves the error status of categories.
 *
 * @example
 * ```
 * import { getCategoriesError } from '@farfetch/blackout-redux/categories';
 *
 * const mapStateToProps = state => ({
 *     error: getCategoriesError(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Error information (`null` if there are no errors).
 */
export const getCategoriesError = (state: StoreState) =>
  getError(state.categories as CategoriesState);

/**
 * Retrieves the loading state of categories.
 *
 * @example
 * ```
 * import { areCategoriesLoading } from '@farfetch/blackout-redux/categories';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areCategoriesLoading(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - Loading status of categories.
 */
export const areCategoriesLoading = (state: StoreState) =>
  getIsLoading(state.categories as CategoriesState);

/**
 * Returns the fetched status of categories.
 *
 * @example
 * ```
 * import { areCategoriesFetched } from '@farfetch/blackout-redux/categories';
 *
 * const mapStateToProps = state => ({
 *     areCategoriesFetched: areCategoriesFetched(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - If categories are fetched or not.
 */
export const areCategoriesFetched = (state: StoreState) =>
  getIsFetched(state.categories as CategoriesState) &&
  !areCategoriesLoading(state);
