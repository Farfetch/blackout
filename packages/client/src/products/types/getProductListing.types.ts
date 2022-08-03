import type { Config } from '../..';
import type { GetProductListingQuery } from './listingQuery.types';
import type { ProductListing } from './listing.types';

export type GetProductListing = (
  slug: string,
  query?: GetProductListingQuery,
  config?: Config,
) => Promise<ProductListing>;
