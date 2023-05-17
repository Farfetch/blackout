import { fetchUserCreditsFactory } from './factories/index.js';
import { getUserCredits } from '@farfetch/blackout-client';

/**
 * Fetch user credit balance.
 */
export default fetchUserCreditsFactory(getUserCredits);
