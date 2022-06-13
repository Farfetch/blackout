import { fetchSetFactory } from './factories';
import { getSet } from '@farfetch/blackout-client';

/**
 * Fetch a specific set by its id.
 */
export const fetchSet = fetchSetFactory(getSet);
