import { getEntities, getEntityById } from './entity';
import type { Category } from '@farfetch/blackout-client';
import type { StoreState } from '../../types';

/**
 * Returns a specific category by its id.
 *
 * @param state      - Application state.
 * @param categoryId - Category id.
 *
 * @returns Category normalized or undefined is nothing found.
 */
export const getCategory = (
  state: StoreState,
  categoryId: Category['id'],
): Category | undefined => getEntityById(state, 'categories', categoryId);

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
export const getCategories = (
  state: StoreState,
): Record<Category['id'], Category> | undefined =>
  getEntities(state, 'categories');
