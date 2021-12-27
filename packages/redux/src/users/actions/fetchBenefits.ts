import { fetchBenefitsFactory } from './factories';
import { getBenefits } from '@farfetch/blackout-client/users';

/**
 * Fetch user benefits.
 *
 * @memberof module:users/actions
 *
 * @function fetchBenefits
 *
 * @type {FetchBenefitsThunkFactory}
 */
export default fetchBenefitsFactory(getBenefits);
