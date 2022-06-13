import { fetchProductDetailsFactory } from './factories';
import { getProductDetails } from '@farfetch/blackout-client';

/**
 * Fetch product details for a given product id.
 */
export const fetchProductDetails =
  fetchProductDetailsFactory(getProductDetails);
