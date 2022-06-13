import { fetchListingFactory } from './factories';
import { getListing } from '@farfetch/blackout-client';

/**
 * Fetch product listing for a given slug with specific query parameters.
 */

export const fetchListing = fetchListingFactory(getListing);
