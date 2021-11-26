import { fetchProductSizesFactory } from './factories';
import { getProductSizes } from '@farfetch/blackout-client/products';

/**
 * Fetch product sizes for a given product id.
 *
 * @memberof module:products/actions
 *
 * @name fetchProductSizes
 *
 * @type {FetchProductSizesThunkFactory}
 */
export default fetchProductSizesFactory(getProductSizes);
