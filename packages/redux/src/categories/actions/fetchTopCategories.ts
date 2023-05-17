import { fetchTopCategoriesFactory } from './factories/index.js';
import { getTopCategories } from '@farfetch/blackout-client';

/**
 * Fetches top categories.
 */
export default fetchTopCategoriesFactory(getTopCategories);
