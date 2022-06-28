import { createCheckoutFactory } from './factories';
import { postCheckoutOrder } from '@farfetch/blackout-client';

/**
 * Create checkout.
 */
export default createCheckoutFactory(postCheckoutOrder);
