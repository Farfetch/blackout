import { fetchProductVariantsByMerchantsLocationsFactory } from './factories';
import { getProductVariantsByMerchantsLocations } from '@farfetch/blackout-client/products';

/**
 * Fetch the merchants locations for a specific product variant.
 */
export default fetchProductVariantsByMerchantsLocationsFactory(
  getProductVariantsByMerchantsLocations,
);
