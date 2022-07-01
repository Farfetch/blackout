import { getEntities, getEntityById } from './entity';
import type { SizeScale } from '@farfetch/blackout-client';
import type { StoreState } from '../../types';

/**
 * Returns a specific scale by its id.
 *
 * @param state - Application state.
 * @param id    - Scale id.
 *
 * @returns Scale normalized.
 */
export const getSizeScale = (
  state: StoreState,
  id: SizeScale['sizeScaleId'],
): SizeScale | undefined => getEntityById(state, 'sizeScales', id);

/**
 * Returns all size scales fetched.
 *
 * @param state - Application state.
 *
 * @returns List of scales by id.
 */
export const getSizeScales = (
  state: StoreState,
): Record<SizeScale['sizeScaleId'], SizeScale> | undefined =>
  getEntities(state, 'sizeScales');
