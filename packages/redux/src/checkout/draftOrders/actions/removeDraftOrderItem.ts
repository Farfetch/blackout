import { deleteDraftOrderItem } from '@farfetch/blackout-client';
import removeDraftOrderItemFactory from './factories/removeDraftOrderItemFactory.js';

/**
 * Remove draft order item.
 */
export default removeDraftOrderItemFactory(deleteDraftOrderItem);
