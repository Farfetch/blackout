import { fetchProductAttributesFactory } from './factories/index.js';
import { getProductAttributes } from '@farfetch/blackout-client';

/**
 * Fetch product attributes for a given product id.
 */
export default fetchProductAttributesFactory(getProductAttributes);
