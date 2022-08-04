import { createCheckoutOrderFactory } from './factories';
import { postCheckoutOrder } from '@farfetch/blackout-client';

/**
 * Create checkout order.
 */
export default createCheckoutOrderFactory(postCheckoutOrder);
