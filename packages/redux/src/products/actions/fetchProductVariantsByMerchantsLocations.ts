import { fetchProductVariantsByMerchantsLocationsFactory } from './factories/index.js';
import { getProductVariantsMerchantsLocations } from '@farfetch/blackout-client';

/**
 * Fetch the merchants locations for a specific product variant.
 */
export default fetchProductVariantsByMerchantsLocationsFactory(
  getProductVariantsMerchantsLocations,
);
