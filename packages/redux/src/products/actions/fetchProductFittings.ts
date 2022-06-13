import { fetchProductFittingsFactory } from './factories';
import { getProductFittings } from '@farfetch/blackout-client';

/**
 * Fetch product fittings for a given product id.
 */
export const fetchProductFittings =
  fetchProductFittingsFactory(getProductFittings);
