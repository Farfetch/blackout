import { fetchProductGroupingFactory } from './factories';
import { getProductGrouping } from '@farfetch/blackout-client';

/**
 * Fetch product grouping for a given product id.
 */
export default fetchProductGroupingFactory(getProductGrouping);
