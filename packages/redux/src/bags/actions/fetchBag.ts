import { fetchBagFactory } from './factories/index.js';
import { getBag } from '@farfetch/blackout-client';

/**
 * Fetches the bag.
 */
export default fetchBagFactory(getBag);
