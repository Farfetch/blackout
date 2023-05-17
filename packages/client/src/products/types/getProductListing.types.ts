import type { Config } from '../../index.js';
import type { GetProductListingQuery } from './listingQuery.types.js';
import type { ProductListing } from './listing.types.js';

export type GetProductListing = (
  slug: string,
  query?: GetProductListingQuery,
  config?: Config,
) => Promise<ProductListing>;
