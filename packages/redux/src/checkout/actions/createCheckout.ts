import { createCheckoutFactory } from './factories';
import { postCheckout } from '@farfetch/blackout-client/checkout';

/**
 * Create checkout.
 *
 * @memberof module:checkout/actions
 *
 * @name createCheckout
 *
 * @type {CreateCheckoutThunkFactory}
 */
export default createCheckoutFactory(postCheckout);
