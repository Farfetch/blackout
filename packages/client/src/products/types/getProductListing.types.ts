import type { Listing } from './listing.types';
import type { ListingQuery } from './listingQuery.types';

export type GetProductListing = (
  slug: string,
  query?: ListingQuery,
  config?: Record<string, unknown>,
) => Promise<Listing>;
