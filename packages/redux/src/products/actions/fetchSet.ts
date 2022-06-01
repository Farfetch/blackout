import { fetchSetFactory } from './factories';
import { getSet } from '@farfetch/blackout-client/products';

/**
 * Fetch a specific set by its id.
 */
export default fetchSetFactory(getSet);
