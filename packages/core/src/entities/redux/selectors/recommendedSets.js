import { getEntity } from './entity';

/**
 * Returns a specific recommended set by its id.
 *
 * @function getRecommendedSet
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Recommended set id.
 *
 * @returns {object} Recommended set normalized.
 */
export const getRecommendedSet = (state, id) =>
  getEntity(state, 'recommendedSets', id);
