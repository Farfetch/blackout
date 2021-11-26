import { getEntities, getEntityById } from './entity';
import type { Category } from '@farfetch/blackout-client/categories/types';
import type { StoreState } from '../../types';

/**
 * Returns a specific category by its id.
 *
 * @function getCategory
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} categoryId - Category id.
 *
 * @returns {object | undefined} Category normalized or undefined is nothing found.
 */
export const getCategory = (
  state: StoreState,
  categoryId: Category['id'],
): Category | undefined => getEntityById(state, 'categories', categoryId);

/**
 * Retrieves a list of all the categories available.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} - Categories by id.
 *
 * @example
 * import { getCategories } from '@farfetch/blackout-redux/entities/selectors';
 *
 * const mapStateToProps = state => ({
 *     categories: getCategories(state)
 * });
 */
export const getCategories = (
  state: StoreState,
): Record<Category['id'], Category> | undefined =>
  getEntities(state, 'categories');
