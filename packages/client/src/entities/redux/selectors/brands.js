import { getEntity } from './entity';

/**
 * Returns a specific brand by its id.
 *
 * @function getBrand
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} brandId - Brand id.
 *
 * @returns {object} Brand normalized.
 */
export const getBrand = (state, brandId) => getEntity(state, 'brands', brandId);

/**
 * Returns all brands from state.
 *
 * @function getBrands
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Object with key values pairs
 * representing brandId and brand properties.
 */
export const getBrands = state => getEntity(state, 'brands');
