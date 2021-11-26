import { getEntityById } from './entity';
import type { State } from '@farfetch/blackout-client/locale/types';
import type { StoreState } from '../../types';

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
export const getState = (state: StoreState, id: number): State =>
  getEntityById(state, 'states', id);
