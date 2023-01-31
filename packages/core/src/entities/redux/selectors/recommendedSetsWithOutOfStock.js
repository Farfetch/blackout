import { getEntity } from './entity';

/**
 * Returns a specific recommended set with out of stock by its id.
 *
 * @function getRecommendedSetWithOutOfStock
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Recommended set id.
 *
 * @returns {object} Recommended set with out of stock normalized.
 */
export const getRecommendedSetWithOutOfStock = (state, id) =>
  getEntity(state, 'recommendedSetsWithOutOfStock', id);
