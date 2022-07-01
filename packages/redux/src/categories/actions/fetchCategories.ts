import { fetchCategoriesFactory } from './factories';
import { getCategories } from '@farfetch/blackout-client';

/**
 * Fetches categories.
 */
export default fetchCategoriesFactory(getCategories);
