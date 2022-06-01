import { fetchProductSizesFactory } from './factories';
import { getProductSizes } from '@farfetch/blackout-client/products';

/**
 * Fetch product sizes for a given product id.
 */
export default fetchProductSizesFactory(getProductSizes);
