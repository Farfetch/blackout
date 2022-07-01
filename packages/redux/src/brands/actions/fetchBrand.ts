import { fetchBrandFactory } from './factories';
import { getBrand } from '@farfetch/blackout-client';

/**
 * Fetches a brand with the given id.
 */

export default fetchBrandFactory(getBrand);
