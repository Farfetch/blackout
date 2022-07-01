import { getEntityById } from './entity';
import type { City } from '@farfetch/blackout-client';
import type { StoreState } from '../../types';

/**
 * Returns a specific city by its id.
 *
 * @param state - Application state.
 * @param id    - Identifier of the city.
 *
 * @returns - City normalized.
 */
export const getCity = (state: StoreState, id: number): City | undefined =>
  getEntityById(state, 'cities', id);
