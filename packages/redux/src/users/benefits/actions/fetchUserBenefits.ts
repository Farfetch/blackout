import { fetchUserBenefitsFactory } from './factories';
import { getUserBenefits } from '@farfetch/blackout-client';

/**
 * Fetch user benefits.
 */
export const fetchUserBenefits = fetchUserBenefitsFactory(getUserBenefits);
