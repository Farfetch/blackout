import { fetchBagFactory } from './factories';
import { getBag } from '@farfetch/blackout-client/bags';

/**
 * Fetches a bag item with the given id.
 *
 * @memberof module:bags/actions
 *
 * @name fetchBag
 *
 * @type {FetchBagThunkFactory}
 */

export default fetchBagFactory(getBag);
