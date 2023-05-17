import { fetchBrandsFactory } from './factories/index.js';
import { getBrands } from '@farfetch/blackout-client';

/**
 * Fetches a brands with the given params.
 */

export default fetchBrandsFactory(getBrands);
