import { fetchProductOutfitsFactory } from './factories/index.js';
import { getProductOutfits } from '@farfetch/blackout-client';

/**
 * Fetch product outfits for a given product id.
 */
export default fetchProductOutfitsFactory(getProductOutfits);
