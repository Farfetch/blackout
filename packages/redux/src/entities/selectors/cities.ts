import { getEntityById } from './entity';
import type { City } from '@farfetch/blackout-client/locale/types';
import type { StoreState } from '../../types';

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
export const getCity = (state: StoreState, id: number): City | undefined =>
  getEntityById(state, 'cities', id);
