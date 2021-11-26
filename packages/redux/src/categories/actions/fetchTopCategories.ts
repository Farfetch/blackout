import { fetchTopCategoriesFactory } from './factories';
import { getTopCategories } from '@farfetch/blackout-client/categories';

/**
 * Fetches top categories.
 *
 * @memberof module:categories/actions
 *
 * @function fetchTopCategories
 *
 * @type {FetchTopCategoriesThunkFactory}
 */
export default fetchTopCategoriesFactory(getTopCategories);
