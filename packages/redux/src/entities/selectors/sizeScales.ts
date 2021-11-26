import { getEntities, getEntityById } from './entity';
import type { SizeScale } from '@farfetch/blackout-client/sizeScales/types';
import type { StoreState } from '../../types';

/**
 *
 * Returns a specific scale by its id.
 *
 * @function getSizeScale
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Scale id.
 *
 * @returns {object|undefined} Scale normalized.
 */
export const getSizeScale = (
  state: StoreState,
  id: SizeScale['sizeScaleId'],
): SizeScale | undefined => getEntityById(state, 'sizeScales', id);

/**
 * Returns all size scales fetched.
 *
 * @function getSizeScales
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {object|undefined} List of scales by id.
 */
export const getSizeScales = (
  state: StoreState,
): Record<SizeScale['sizeScaleId'], SizeScale> | undefined =>
  getEntities(state, 'sizeScales');
