import { postDraftOrder } from '@farfetch/blackout-client';
import createDraftOrderFactory from './factories/createDraftOrderFactory.js';

/**
 * Create draft order.
 */
export default createDraftOrderFactory(postDraftOrder);
