import { fetchProductFittingsFactory } from './factories';
import { getProductFittings } from '@farfetch/blackout-client/products';

/**
 * Fetch product fittings for a given product id.
 */
export default fetchProductFittingsFactory(getProductFittings);
