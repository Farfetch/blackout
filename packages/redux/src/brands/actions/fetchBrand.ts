import { fetchBrandFactory } from './factories';
import { getBrand } from '@farfetch/blackout-client/brands';

/**
 * Fetches a brand with the given id.
 */

export default fetchBrandFactory(getBrand);
