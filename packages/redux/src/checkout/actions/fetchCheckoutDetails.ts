import { fetchCheckoutDetailsFactory } from './factories';
import { getCheckoutOrderDetails } from '@farfetch/blackout-client';

/**
 * Fetch checkout details.
 */
export default fetchCheckoutDetailsFactory(getCheckoutOrderDetails);
