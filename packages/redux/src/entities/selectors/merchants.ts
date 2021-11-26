import { getEntityById } from './entity';
import type { MerchantEntity } from '../../entities/types';
import type { StoreState } from '../../types';

/**
 * Returns a specific merchant by its id.
 *
 * @function getMerchant
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} merchantId - Merchant id.
 *
 * @returns {object} Merchant normalized.
 */
export const getMerchant = (
  state: StoreState,
  merchantId: MerchantEntity['id'],
): MerchantEntity | undefined => getEntityById(state, 'merchants', merchantId);
