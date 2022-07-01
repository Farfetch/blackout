import { fetchProductsListFactory } from './fetchProductsListFactory';
import type {
  Config,
  GetProductListing,
  GetProductListingQuery,
  Listing,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
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
 * @param getProductListing - Get listing client.
 *
 * @returns Thunk factory.
 */
export const fetchListingFactory =
  (getProductListing: GetProductListing) =>
  (
    slug: string,
    query: GetProductListingQuery = {},
    actionOptions?: ProductsListActionOptions,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch,
    getState: () => StoreState,
    options: GetOptionsArgument,
  ): Promise<Listing | undefined> =>
    // @ts-expect-error The auxiliary function could return a Promise<Listing | Set | undefined>
    fetchProductsListFactory(
      getProductListing,
      slug,
      query,
      actionOptions,
      config,
      dispatch,
      getState,
      options,
      false,
    );
