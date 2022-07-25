import { fetchProductSizesFactory } from './factories';
import { getProductSizes } from '@farfetch/blackout-client';

/**
 * Fetch product sizes for a given product id.
 */
export default fetchProductSizesFactory(getProductSizes);
