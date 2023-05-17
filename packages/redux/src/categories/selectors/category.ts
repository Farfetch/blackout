import { getEntityById } from '../../entities/selectors/index.js';
import { getError, getIsLoading } from '../reducer/category.js';
import type { Category } from '@farfetch/blackout-client';
import type { CategoryState } from '../types/index.js';
import type { StoreState } from '../../types/index.js';

/**
 * Retrieves the error status of a category by its id.
 *
 * @param state - Application state.
 *
 * @returns Error information (`null` if there are no errors).
 */
export const getCategoryError = (
  state: StoreState,
  categoryId: Category['id'],
) => getError(state.categories?.category as CategoryState)[categoryId];

/**
 * Retrieves the loading state of a category by its id.
 *
 * @param state - Application state.
 * @param id - Category id.
 *
 * @returns - Loading status of category.
 */
export const isCategoryLoading = (
  state: StoreState,
  categoryId: Category['id'],
) => getIsLoading(state.categories?.category as CategoryState)[categoryId];

/**
 * Returns the fetched status.
 *
 * @param state - Application state.
 * @param id - Category id.
 *
 * @returns - If category is fetched or not.
 */
export const isCategoryFetched = (
  state: StoreState,
  categoryId: Category['id'],
) =>
  (!!getEntityById(state, 'categories', categoryId) ||
    !!getCategoryError(state, categoryId)) &&
  !isCategoryLoading(state, categoryId);

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
