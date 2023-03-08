import { getEntities, getEntityById } from '../../entities/selectors/entity.js';
import type { MerchantEntity } from '../../entities/types/index.js';
import type { StoreState } from '../../types/index.js';

/**
 * Returns a specific merchant by its id.
 *
 * @param state      - Application state.
 * @param merchantId - Merchant id.
 *
 * @returns Merchant normalized.
 */
export const getMerchant = (
  state: StoreState,
  merchantId: MerchantEntity['id'],
) => getEntityById(state, 'merchants', merchantId);

/**
 * Returns all the merchants in the application state.
 *
 * @param state - Application state.
 *
 * @returns Object with all merchants with its merchantId as the key.
 */
export const getMerchants = (state: StoreState) =>
  getEntities(state, 'merchants');
