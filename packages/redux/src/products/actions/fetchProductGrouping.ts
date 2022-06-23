import { fetchProductGroupingFactory } from './factories';
import { getProductGrouping } from '@farfetch/blackout-client/products';

/**
 * Fetch product grouping for a given product id.
 */
export const fetchProductGrouping =
  fetchProductGroupingFactory(getProductGrouping);
