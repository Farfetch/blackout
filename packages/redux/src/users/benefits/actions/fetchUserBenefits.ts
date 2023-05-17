import { fetchUserBenefitsFactory } from './factories/index.js';
import { getUserBenefits } from '@farfetch/blackout-client';

/**
 * Fetch user benefits.
 */
export default fetchUserBenefitsFactory(getUserBenefits);
