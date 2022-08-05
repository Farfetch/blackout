import { getEntities, getEntityById } from '../../entities';
import { getError, getIsFetched, getIsLoading } from '../reducer/categories';
import type { CategoriesState } from '../types';
import type { Category } from '@farfetch/blackout-client';
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
  getIsFetched(state.categories as CategoriesState);

/**
 * Returns a specific category by its id.
 *
 * @param state      - Application state.
 * @param categoryId - Category id.
 *
 * @returns Category normalized or undefined if nothing found.
 */
export const getCategory = (state: StoreState, categoryId: Category['id']) =>
  getEntityById(state, 'categories', categoryId);

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
