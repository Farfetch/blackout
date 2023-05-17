import { fetchUserTitlesFactory } from './factories/index.js';
import { getUserTitles } from '@farfetch/blackout-client';

/**
 * Fetch a list of titles.
 */
export default fetchUserTitlesFactory(getUserTitles);
