import { fetchTopCategoriesFactory } from './factories';
import { getTopCategories } from '@farfetch/blackout-client';

/**
 * Fetches top categories.
 */
export default fetchTopCategoriesFactory(getTopCategories);
