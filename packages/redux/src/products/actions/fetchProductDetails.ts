import { fetchProductDetailsFactory } from './factories';
import { getProductDetails } from '@farfetch/blackout-client/products';

/**
 * Fetch product details for a given product id.
 *
 * @memberof module:products/actions
 *
 * @name fetchProductDetails
 *
 * @type {FetchProductDetailsThunkFactory}
 */
export default fetchProductDetailsFactory(getProductDetails);
