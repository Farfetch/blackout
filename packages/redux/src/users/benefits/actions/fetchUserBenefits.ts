import { fetchUserBenefitsFactory } from './factories';
import { getUserBenefits } from '@farfetch/blackout-client';

/**
 * Fetch user benefits.
 */
export default fetchUserBenefitsFactory(getUserBenefits);
