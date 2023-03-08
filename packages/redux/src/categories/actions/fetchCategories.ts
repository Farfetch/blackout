import { fetchCategoriesFactory } from './factories/index.js';
import { getCategories } from '@farfetch/blackout-client';

/**
 * Fetches categories.
 */
export default fetchCategoriesFactory(getCategories);
