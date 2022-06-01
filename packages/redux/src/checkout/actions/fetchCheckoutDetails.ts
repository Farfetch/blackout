import { fetchCheckoutDetailsFactory } from './factories';
import { getCheckoutDetails } from '@farfetch/blackout-client/checkout';

/**
 * Fetch checkout details.
 */
export default fetchCheckoutDetailsFactory(getCheckoutDetails);
