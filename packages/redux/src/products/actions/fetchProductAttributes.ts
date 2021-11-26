import { fetchProductAttributesFactory } from './factories';
import { getProductAttributes } from '@farfetch/blackout-client/products';

/**
 * Fetch product attributes for a given product id.
 *
 * @memberof module:products/actions
 *
 * @name fetchProductAttributes
 *
 * @type {FetchProductAttributesThunkFactory}
 */
export default fetchProductAttributesFactory(getProductAttributes);
