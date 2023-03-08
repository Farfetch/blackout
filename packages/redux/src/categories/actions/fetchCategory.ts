import { fetchCategoryFactory } from './factories/index.js';
import { getCategory } from '@farfetch/blackout-client';

/**
 * Fetch category.
 */
export default fetchCategoryFactory(getCategory);
