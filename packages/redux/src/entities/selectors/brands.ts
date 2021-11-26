import { getEntities, getEntityById } from './entity';
import type { Brand } from '@farfetch/blackout-client/brands/types';
import type { StoreState } from '../../types';

/**
 * Returns a specific brand by its id.
 *
 * @function getBrand
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} brandId - Brand id.
 *
 * @returns {object} Brand normalized.
 */
export const getBrand = (
  state: StoreState,
  brandId: Brand['id'],
): Brand | undefined => getEntityById(state, 'brands', brandId);

/**
 * Returns all brands from state.
 *
 * @function getBrands
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Object with key values pairs
 * representing brandId and brand properties.
 */
export const getBrands = (
  state: StoreState,
): Record<Brand['id'], Brand> | undefined => getEntities(state, 'brands');
