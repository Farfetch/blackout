import { fetchSetFactory } from './factories';
import { getProductSet } from '@farfetch/blackout-client';

/**
 * Fetch a specific set by its id.
 */
export default fetchSetFactory(getProductSet);