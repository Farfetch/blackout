import { fetchProductDetailsFactory } from './factories';
import { getProduct } from '@farfetch/blackout-client';

/**
 * Fetch product details for a given product id.
 */
export const fetchProductDetails = fetchProductDetailsFactory(getProduct);
