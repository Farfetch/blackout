import { fetchCheckoutDetailsFactory } from './factories';
import { getCheckoutDetails } from '@farfetch/blackout-client/checkout';

/**
 * Fetch checkout details.
 *
 * @memberof module:checkout/actions
 *
 * @name fetchCheckoutDetails
 *
 * @type {FetchCheckoutDetailsThunkFactory}
 */
export default fetchCheckoutDetailsFactory(getCheckoutDetails);
