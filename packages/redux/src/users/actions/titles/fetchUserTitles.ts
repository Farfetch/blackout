import { fetchUserTitlesFactory } from './factories';
import { getUserTitles } from '@farfetch/blackout-client';

/**
 * Fetch a list of titles.
 */
export const fetchUserTitles = fetchUserTitlesFactory(getUserTitles);
