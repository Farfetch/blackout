import { getDraftOrder } from '@farfetch/blackout-client';
import fetchDraftOrderFactory from './factories/fetchDraftOrderFactory.js';

/**
 * Get draft order.
 */
export default fetchDraftOrderFactory(getDraftOrder);
