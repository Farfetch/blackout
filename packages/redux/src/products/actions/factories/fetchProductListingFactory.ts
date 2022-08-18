import fetchProductsListFactory from './fetchProductsListFactory';
import type {
  Config,
  GetProductListing,
  GetProductListingQuery,
  ProductListing,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types';
import type { ProductsListActionOptions } from '../../types';

/**
 * Creates a thunk factory configured with the specified client to fetch a product
 * listing for a given slug with specific query parameters.
 *
 * @param getProductListing - Get listing client.
 *
 * @returns Thunk factory.
 */
const fetchProductListingFactory =
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
  ): Promise<ProductListing | undefined> =>
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

export default fetchProductListingFactory;
