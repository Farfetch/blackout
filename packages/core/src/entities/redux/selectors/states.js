import { getEntity } from './entity';

/**
 * Returns a specific state by its id.
 *
 * @function getState
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Identifier of the state.
 *
 * @returns {object} - State normalized.
 */
export const getState = (state, id) => getEntity(state, 'states', id);
