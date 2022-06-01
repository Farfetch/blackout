import fetchProductsListFactory from './fetchProductsListFactory';
import type { Dispatch } from 'redux';
import type {
  GetListing,
  Listing,
  ListingQuery,
} from '@farfetch/blackout-client/products/types';
import type { GetOptionsArgument, StoreState } from '../../../types';
import type { ProductsListActionOptions } from '../../types';

/**
 * @param slug          - Slug to load listing for.
 * @param query         - Query parameters to apply.
 * @param actionOptions - Additional options to apply to the action.
 * @param config        - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch a product
 * listing for a given slug with specific query parameters.
 *
 * @param getListing - Get listing client.
 *
 * @returns Thunk factory.
 */
const fetchListingFactory =
  (getListing: GetListing) =>
  (
    slug: string,
    query: ListingQuery = {},
    actionOptions?: ProductsListActionOptions,
    config?: Record<string, unknown>,
  ) =>
  async (
    dispatch: Dispatch,
    getState: () => StoreState,
    options: GetOptionsArgument,
  ): Promise<Listing | undefined> =>
    // @ts-expect-error The auxiliary function could return a Promise<Listing | Set | undefined>
    fetchProductsListFactory(
      getListing,
      slug,
      query,
      actionOptions,
      config,
      dispatch,
      getState,
      options,
      false,
    );

export default fetchListingFactory;
