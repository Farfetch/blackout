// @ts-ignore This is needed while products aren't migrated
import { fetchRecommendedSetFactory } from './factories';
import { getRecommendedSet } from '@farfetch/blackout-client/products';

/**
 * Fetch a recommended set by id.
 */
export default fetchRecommendedSetFactory(getRecommendedSet);
