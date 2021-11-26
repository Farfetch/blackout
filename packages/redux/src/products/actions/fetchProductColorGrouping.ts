import { fetchProductColorGroupingFactory } from './factories';
import { getProductColorGrouping } from '@farfetch/blackout-client/products';

/**
 * Fetch product color grouping for a given product id.
 *
 * @memberof module:products/actions
 *
 * @name fetchProductColorGrouping
 *
 * @type {FetchProductColorGroupingThunkFactory}
 */
export default fetchProductColorGroupingFactory(getProductColorGrouping);
