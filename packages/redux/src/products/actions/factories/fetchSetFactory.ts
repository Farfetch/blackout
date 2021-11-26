import fetchProductsListFactory from './fetchProductsListFactory';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types';
import type {
  GetSet,
  Set,
  SetQuery,
} from '@farfetch/blackout-client/products/types';
import type { ProductsListActionOptions } from '../../types';

/**
 * @callback FetchSetThunkFactory
 *
 * @param {string|number} slug - Set identifier (ID, slug or gender/slug).
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
 * specific set by its id.
 *
 * @memberof module:products/actions/factories
 *
 * @param {Function} getSet - Get set client.
 *
 * @returns {FetchSetThunkFactory} Thunk factory.
 */
const fetchSetFactory =
  (getSet: GetSet) =>
  (
    slug: string | number,
    query: SetQuery = {},
    actionOptions?: ProductsListActionOptions,
    config?: Record<string, unknown>,
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
    );

export default fetchSetFactory;
