import { fetchProductAttributesFactory } from './factories';
import { getProductAttributes } from '@farfetch/blackout-client/products';

/**
 * Fetch product attributes for a given product id.
 */
export default fetchProductAttributesFactory(getProductAttributes);
