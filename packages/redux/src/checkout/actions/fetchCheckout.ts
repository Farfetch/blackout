import { fetchCheckoutFactory } from './factories';
import { getCheckout } from '@farfetch/blackout-client/checkout';

/**
 * Fetch checkout.
 */
export default fetchCheckoutFactory(getCheckout);
