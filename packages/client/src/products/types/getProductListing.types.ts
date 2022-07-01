import type { Config } from '../..';
import type { GetProductListingQuery } from './listingQuery.types';
import type { Listing } from './listing.types';

export type GetProductListing = (
  slug: string,
  query?: GetProductListingQuery,
  config?: Config,
) => Promise<Listing>;
