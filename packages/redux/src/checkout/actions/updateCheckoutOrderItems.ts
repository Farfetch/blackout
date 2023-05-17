import { patchCheckoutOrderItems } from '@farfetch/blackout-client';
import { updateCheckoutOrderItemsFactory } from './factories/index.js';

/**
 * Update checkout order items.
 */
export default updateCheckoutOrderItemsFactory(patchCheckoutOrderItems);
