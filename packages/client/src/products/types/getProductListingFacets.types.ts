import type { Config, FacetGroup } from '../../index.js';
import type { ProductListingFacetsQuery } from './productListingFacetsQuery.types.js';

export type GetProductListingFacets = (
  query?: ProductListingFacetsQuery,
  config?: Config,
) => Promise<FacetGroup[]>;
