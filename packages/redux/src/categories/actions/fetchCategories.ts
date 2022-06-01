import { fetchCategoriesFactory } from './factories';
import { getCategories } from '@farfetch/blackout-client/categories';

/**
 * Fetches categories.
 */
export default fetchCategoriesFactory(getCategories);
