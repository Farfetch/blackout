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
 * @callback FetchListingThunkFactory
 *
 * @param {string} slug - Slug to load listing for.
 * @param {object} [query] - Query parameters to apply.
 * @param {object} [actionOptions] - Additional options to apply to the action.
 * @param {string} [actionOptions.useCache=false] - If the request result will be cached.
 * @param {string} [actionOptions.setProductsListHash=true] - Allows the listing hash to be set.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch a
 * product listing for a given slug with specific query parameters.
 *
 * @memberof module:products/actions/factories
 *
 * @param {Function} getListing - Get listing client.
 *
 * @returns {FetchListingThunkFactory} Thunk factory.
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
