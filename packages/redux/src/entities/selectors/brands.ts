import { getEntities, getEntityById } from './entity';
import type { Brand } from '@farfetch/blackout-client';
import type { StoreState } from '../../types';

/**
 * Returns a specific brand by its id.
 *
 * @param state   - Application state.
 * @param brandId - Brand id.
 *
 * @returns Brand normalized.
 */
export const getBrand = (
  state: StoreState,
  brandId: Brand['id'],
): Brand | undefined => getEntityById(state, 'brands', brandId);

/**
 * Returns all brands from state.
 *
 * @param state - Application state.
 *
 * @returns Object with key values pairs representing brandId and brand properties.
 */
export const getBrands = (
  state: StoreState,
): Record<Brand['id'], Brand> | undefined => getEntities(state, 'brands');
