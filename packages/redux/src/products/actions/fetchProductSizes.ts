import { fetchProductSizesFactory } from './factories/index.js';
import { getProductSizes } from '@farfetch/blackout-client';

/**
 * Fetch product sizes for a given product id.
 */
export default fetchProductSizesFactory(getProductSizes);
