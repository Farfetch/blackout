import fetchProductsListFactory from './fetchProductsListFactory.js';
import type {
  Config,
  GetProductSet,
  GetProductSetQuery,
  ProductSet,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types/index.js';
import type { ProductsListActionOptions } from '../../types/index.js';

/**
 * Creates a thunk factory configured with the specified client to fetch a specific
 * set by its id.
 *
 * @param getProductSet - Get product set client.
 *
 * @returns Thunk factory.
 */
const fetchProductSetFactory =
  (getSet: GetProductSet) =>
  (
    slug: string | number,
    query: GetProductSetQuery = {},
    actionOptions?: ProductsListActionOptions,
    config?: Config,
  ) =>
  (
    dispatch: Dispatch,
    getState: () => StoreState,
    options: GetOptionsArgument,
  ): Promise<ProductSet | undefined> =>
    fetchProductsListFactory(
      getSet,
      slug,
      query,
      actionOptions,
      config,
      dispatch,
      getState,
      options,
      true,
    ) as Promise<ProductSet | undefined>;

export default fetchProductSetFactory;
