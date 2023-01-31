import { getEntity } from './entity';

/**
 * Returns a specific category by its id.
 *
 * @function getCategory
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} categoryId - Category id.
 *
 * @returns {object} Category normalized.
 */
export const getCategory = (state, categoryId) =>
  getEntity(state, 'categories', categoryId);
