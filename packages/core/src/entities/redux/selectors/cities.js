import { getEntity } from './entity';

/**
 * Returns a specific city by its id.
 *
 * @function getCity
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Identifier of the city.
 *
 * @returns {object} - City normalized.
 */
export const getCity = (state, id) => getEntity(state, 'cities', id);
