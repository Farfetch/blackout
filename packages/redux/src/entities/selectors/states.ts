import { getEntityById } from './entity';
import type { StoreState } from '../../types';

/**
 * Returns a specific state by its id.
 *
 * @param state - Application state.
 * @param id    - Identifier of the state.
 *
 * @returns - State normalized.
 */
export const getState = (state: StoreState, id: number) =>
  getEntityById(state, 'states', id);
