import { fetchProductVariantsByMerchantsLocationsFactory } from './factories';
import { getProductVariantsMerchantsLocations } from '@farfetch/blackout-client';

/**
 * Fetch the merchants locations for a specific product variant.
 */
export default fetchProductVariantsByMerchantsLocationsFactory(
  getProductVariantsMerchantsLocations,
);
