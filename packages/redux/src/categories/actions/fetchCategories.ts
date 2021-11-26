import { fetchCategoriesFactory } from './factories';
import { getCategories } from '@farfetch/blackout-client/categories';

/**
 * Fetches categories.
 *
 * @memberof module:categories/actions
 *
 * @function fetchCategories
 *
 * @type {FetchCategoriesThunkFactory}
 */
export default fetchCategoriesFactory(getCategories);
