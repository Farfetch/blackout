import { fetchCheckoutOrderDetailsFactory } from './factories';
import { getCheckoutOrderDetails } from '@farfetch/blackout-client';

/**
 * Fetch checkout order details.
 */
export default fetchCheckoutOrderDetailsFactory(getCheckoutOrderDetails);
