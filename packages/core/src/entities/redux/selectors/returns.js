import { getEntity } from './entity';

/**
 * Returns the 'returns' entity from the application state.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Returns entity.
 */
export const getReturns = state => getEntity(state, 'returns');

/**
 * Returns the 'returnItems' entity from the application state.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} ReturnsItems entity.
 */
export const getReturnItems = state => getEntity(state, 'returnItems');
