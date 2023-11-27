import fetchProductListFactory from './fetchProductListFactory.js';
import type {
  Config,
  GetProductListing,
  GetProductListingQuery,
  ProductListing,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types/index.js';
import type { ProductListActionOptions } from '../../types/index.js';

/**
 * Creates a thunk factory configured with the specified client to fetch a specific
 * custom listing page by its id.
 *
 * @param getProductSet - Get custom listing page produts client.
 *
 * @returns Thunk factory.
 */
const fetchCustomListingFactory =
  (getListing: GetProductListing) =>
  (
    slug: string | number,
    query: GetProductListingQuery = {},
    actionOptions?: ProductListActionOptions,
    config?: Config,
  ) =>
  (
    dispatch: Dispatch,
    getState: () => StoreState,
    options: GetOptionsArgument,
  ): Promise<ProductListing | undefined> =>
    fetchProductListFactory(
      getListing,
      slug,
      query,
      actionOptions,
      config,
      dispatch,
      getState,
      options,
      false,
      true,
    ) as Promise<ProductListing | undefined>;

export default fetchCustomListingFactory;
