import { getEntity } from './entity';

/**
 * Returns a specific scale by its id.
 *
 * @function getSizeScale
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Scale id.
 *
 * @returns {object} Scale normalized.
 */
export const getSizeScale = (state, id) => getEntity(state, 'sizeScales', id);

/**
 * Returns all size scales fetched.
 *
 * @function getSizeScales
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {object} List of scales by id.
 */
export const getSizeScales = state => getEntity(state, 'sizeScales');
