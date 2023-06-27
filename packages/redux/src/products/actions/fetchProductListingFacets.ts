import { fetchProductListingFacetsFactory } from './factories/index.js';
import { getProductListingFacets } from '@farfetch/blackout-client';

/**
 * Fetches product listing facets.
 */
export default fetchProductListingFacetsFactory(getProductListingFacets);
