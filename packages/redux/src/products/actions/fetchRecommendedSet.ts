// @ts-ignore This is needed while products aren't migrated
import { fetchRecommendedSetFactory } from './factories';
import { getRecommendedSet } from '@farfetch/blackout-client/products';

/**
 * Fetch a recommended set by id.
 *
 * @function fetchRecommendedSet
 * @memberof module:products/actions
 *
 * @type {FetchRecommendedSetThunkFactory}
 */
export default fetchRecommendedSetFactory(getRecommendedSet);
