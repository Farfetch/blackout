import { fetchProductAttributesFactory } from './factories';
import { getProductAttributes } from '@farfetch/blackout-client';

/**
 * Fetch product attributes for a given product id.
 */
export const fetchProductAttributes =
  fetchProductAttributesFactory(getProductAttributes);
