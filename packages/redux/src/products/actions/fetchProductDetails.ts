import { fetchProductDetailsFactory } from './factories';
import { getProductDetails } from '@farfetch/blackout-client/products';

/**
 * Fetch product details for a given product id.
 */
export default fetchProductDetailsFactory(getProductDetails);
