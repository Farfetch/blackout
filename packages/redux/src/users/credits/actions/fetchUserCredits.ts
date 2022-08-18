import { fetchUserCreditsFactory } from './factories';
import { getUserCredits } from '@farfetch/blackout-client';

/**
 * Fetch user credit balance.
 */
export default fetchUserCreditsFactory(getUserCredits);
