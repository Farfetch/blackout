// @ts-ignore This is needed while products aren't migrated
import { fetchRecommendedSetFactory } from './factories/index.js';
import { getProductRecommendedSet } from '@farfetch/blackout-client';

/**
 * Fetch a recommended set by id.
 */
export default fetchRecommendedSetFactory(getProductRecommendedSet);
