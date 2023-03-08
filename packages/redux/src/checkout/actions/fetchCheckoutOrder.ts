import { fetchCheckoutOrderFactory } from './factories/index.js';
import { getCheckoutOrder } from '@farfetch/blackout-client';

/**
 * Fetch checkout order.
 */
export default fetchCheckoutOrderFactory(getCheckoutOrder);
