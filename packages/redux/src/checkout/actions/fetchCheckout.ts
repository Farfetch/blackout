import { fetchCheckoutFactory } from './factories';
import { getCheckout } from '@farfetch/blackout-client/checkout';

/**
 * Fetch checkout.
 *
 * @memberof module:checkout/actions
 *
 * @name fetchCheckout
 *
 * @type {FetchCheckoutThunkFactory}
 */
export default fetchCheckoutFactory(getCheckout);
