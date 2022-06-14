import { fetchBenefitsFactory } from './factories';
import { getUserBenefits } from '@farfetch/blackout-client/users';

/**
 * Fetch user benefits.
 */
export default fetchBenefitsFactory(getUserBenefits);
