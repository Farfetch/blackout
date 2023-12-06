import { getDraftOrders } from '@farfetch/blackout-client';
import fetchDraftOrdersFactory from './factories/fetchDraftOrdersFactory.js';

/**
 * Get draft orders.
 */
export default fetchDraftOrdersFactory(getDraftOrders);
