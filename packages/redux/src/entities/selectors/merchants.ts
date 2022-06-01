import { getEntityById } from './entity';
import type { MerchantEntity } from '../../entities/types';
import type { StoreState } from '../../types';

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
): MerchantEntity | undefined => getEntityById(state, 'merchants', merchantId);
