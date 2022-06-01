import { fetchBagFactory } from './factories';
import { getBag } from '@farfetch/blackout-client/bags';

/**
 * Fetches the bag.
 */

export default fetchBagFactory(getBag);
