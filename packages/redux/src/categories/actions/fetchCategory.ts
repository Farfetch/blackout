import { fetchCategoryFactory } from './factories';
import { getCategory } from '@farfetch/blackout-client';

/**
 * Fetch category.
 */
export default fetchCategoryFactory(getCategory);
