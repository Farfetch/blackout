import fetchProductsListFactory from './fetchProductsListFactory';
import type {
  Config,
  GetProductSet,
  GetProductSetQuery,
  Set,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types';
import type { ProductsListActionOptions } from '../../types';

/**
 * Creates a thunk factory configured with the specified client to fetch a specific
 * set by its id.
 *
 * @param getSet - Get set client.
 *
 * @returns Thunk factory.
 */
const fetchSetFactory =
  (getSet: GetProductSet) =>
  (
    slug: string | number,
    query: GetProductSetQuery = {},
    actionOptions?: ProductsListActionOptions,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch,
    getState: () => StoreState,
    options: GetOptionsArgument,
  ): Promise<Set | undefined> =>
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
    ) as Promise<Set | undefined>;

export default fetchSetFactory;
