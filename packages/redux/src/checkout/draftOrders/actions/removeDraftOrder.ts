import { deleteDraftOrder } from '@farfetch/blackout-client';
import removeDraftOrderFactory from './factories/removeDraftOrderFactory.js';

/**
 * Remove draft order.
 */
export default removeDraftOrderFactory(deleteDraftOrder);
