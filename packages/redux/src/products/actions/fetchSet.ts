import { fetchSetFactory } from './factories';
import { getSet } from '@farfetch/blackout-client/products';

/**
 * Fetch a specific set by its id.
 *
 * @memberof module:products/actions
 *
 * @name fetchSet
 *
 * @type {FetchSetThunkFactory}
 */
export default fetchSetFactory(getSet);
