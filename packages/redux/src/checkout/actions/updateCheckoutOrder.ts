import { patchCheckoutOrder } from '@farfetch/blackout-client';
import { updateCheckoutOrderFactory } from './factories/index.js';

/**
 * Update checkout order.
 */
export default updateCheckoutOrderFactory(patchCheckoutOrder);
