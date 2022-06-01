import { fetchBenefitsFactory } from './factories';
import { getBenefits } from '@farfetch/blackout-client/users';

/**
 * Fetch user benefits.
 */
export default fetchBenefitsFactory(getBenefits);
