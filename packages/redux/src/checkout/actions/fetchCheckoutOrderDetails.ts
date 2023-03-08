import { fetchCheckoutOrderDetailsFactory } from './factories/index.js';
import { getCheckoutOrderDetails } from '@farfetch/blackout-client';

/**
 * Fetch checkout order details.
 */
export default fetchCheckoutOrderDetailsFactory(getCheckoutOrderDetails);
