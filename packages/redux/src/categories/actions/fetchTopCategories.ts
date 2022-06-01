import { fetchTopCategoriesFactory } from './factories';
import { getTopCategories } from '@farfetch/blackout-client/categories';

/**
 * Fetches top categories.
 */
export default fetchTopCategoriesFactory(getTopCategories);
