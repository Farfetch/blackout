import { fetchProductDetailsFactory } from './factories/index.js';
import { getProduct } from '@farfetch/blackout-client';

/**
 * Fetch product details for a given product id.
 */
export default fetchProductDetailsFactory(getProduct);
