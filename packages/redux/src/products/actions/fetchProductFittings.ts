import { fetchProductFittingsFactory } from './factories';
import { getProductFittings } from '@farfetch/blackout-client/products';

/**
 * Fetch product fittings for a given product id.
 *
 * @memberof module:products/actions
 *
 * @name fetchProductFittings
 *
 * @type {FetchProductFittingsThunkFactory}
 */
export default fetchProductFittingsFactory(getProductFittings);
