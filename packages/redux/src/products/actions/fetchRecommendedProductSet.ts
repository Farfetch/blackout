import { fetchRecommendedProductSetFactory } from './factories/index.js';
import { getRecommendedProductSet } from '@farfetch/blackout-client';

/**
 * Fetch a recommended product set by id.
 */
export default fetchRecommendedProductSetFactory(getRecommendedProductSet);
