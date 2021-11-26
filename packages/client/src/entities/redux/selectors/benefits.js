import { getEntity } from './entity';

/**
 * Returns a benefit by its id.
 *
 * @function getBenefit
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} benefitId - Benefit id.
 *
 * @returns {object} Benefit normalized.
 */
export const getBenefit = (state, benefitId) =>
  getEntity(state, 'benefits', benefitId);
