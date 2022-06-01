import { createCheckoutFactory } from './factories';
import { postCheckout } from '@farfetch/blackout-client/checkout';

/**
 * Create checkout.
 */
export default createCheckoutFactory(postCheckout);
