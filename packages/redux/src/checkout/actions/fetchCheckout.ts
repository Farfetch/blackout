import { fetchCheckoutFactory } from './factories';
import { getCheckoutOrder } from '@farfetch/blackout-client';

/**
 * Fetch checkout.
 */
export default fetchCheckoutFactory(getCheckoutOrder);
