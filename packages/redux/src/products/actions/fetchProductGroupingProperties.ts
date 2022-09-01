import { fetchProductGroupingPropertiesFactory } from './factories';
import { getProductGroupingProperties } from '@farfetch/blackout-client';

/**
 * Fetch product grouping properties for a given product id.
 */
export default fetchProductGroupingPropertiesFactory(
  getProductGroupingProperties,
);
