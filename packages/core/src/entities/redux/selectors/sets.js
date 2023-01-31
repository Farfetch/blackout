import { getEntity } from './entity';

/**
 * Returns a specific set by its id.
 *
 * @function getSet
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Set id.
 *
 * @returns {object} Set normalized.
 */
export const getSet = (state, id) => getEntity(state, 'sets', id);
