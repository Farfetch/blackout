import { fetchProductSetFactory } from './factories/index.js';
import { getProductSet } from '@farfetch/blackout-client';

/**
 * Fetch a specific set by its id.
 */
export default fetchProductSetFactory(getProductSet);
