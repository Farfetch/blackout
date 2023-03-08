import { createCheckoutOrderFactory } from './factories/index.js';
import { postCheckoutOrder } from '@farfetch/blackout-client';

/**
 * Create checkout order.
 */
export default createCheckoutOrderFactory(postCheckoutOrder);
