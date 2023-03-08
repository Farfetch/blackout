import { getEntities } from '../../entities/selectors/index.js';
import { getError, getIsLoading, getResult } from '../reducer/categories.js';
import type { CategoriesState } from '../types/index.js';
import type { StoreState } from '../../types/index.js';

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
  (!!getResult(state.categories as CategoriesState) ||
    !!getCategoriesError(state)) &&
  !areCategoriesLoading(state);

/**
 * Retrieves a list of all the categories available.
 *
 * @example
 * ```
 * import { getCategories } from '@farfetch/blackout-redux/entities/selectors';
 *
 * const mapStateToProps = state => ({
 *     categories: getCategories(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - Categories by id.
 */
export const getCategories = (state: StoreState) =>
  getEntities(state, 'categories');
