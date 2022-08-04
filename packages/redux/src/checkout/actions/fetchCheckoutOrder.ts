import { fetchCheckoutOrderFactory } from './factories';
import { getCheckoutOrder } from '@farfetch/blackout-client';

/**
 * Fetch checkout order.
 */
export default fetchCheckoutOrderFactory(getCheckoutOrder);
