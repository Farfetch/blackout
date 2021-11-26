import { patchCheckout } from '@farfetch/blackout-client/checkout';
import { updateCheckoutFactory } from './factories';

/**
 * Update checkout.
 *
 * @memberof module:checkout/actions
 *
 * @name updateCheckout
 *
 * @type {UpdateCheckoutThunkFactory}
 */
export default updateCheckoutFactory(patchCheckout);
