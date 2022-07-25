import { fetchProductColorGroupingFactory } from './factories';
import { getProductColorGrouping } from '@farfetch/blackout-client';

/**
 * Fetch product color grouping for a given product id.
 */
export default fetchProductColorGroupingFactory(getProductColorGrouping);
