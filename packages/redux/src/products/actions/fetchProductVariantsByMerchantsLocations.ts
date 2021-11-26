import { fetchProductVariantsByMerchantsLocationsFactory } from './factories';
import { getProductVariantsByMerchantsLocations } from '@farfetch/blackout-client/products';

/**
 * Fetch the merchants locations for a specific product variant.
 *
 * @memberof module:products/actions
 *
 * @name fetchProductVariantsByMerchants
 *
 * @type {FetchProductMerchantsLocationsThunkFactory}
 */
export default fetchProductVariantsByMerchantsLocationsFactory(
  getProductVariantsByMerchantsLocations,
);
