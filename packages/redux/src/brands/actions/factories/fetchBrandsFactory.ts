import * as actionTypes from '../../actionTypes';
import {
  Brands,
  BrandsQuery,
  Config,
  GetBrands,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { generateBrandsHash } from '../../utils';
import { isBrandsResultCached } from '../../selectors';
import { normalize } from 'normalizr';
import brand from '../../../entities/schemas/brand';
import type { Dispatch } from 'redux';
import type { FetchBrandsAction } from '../../types';
import type { StoreState } from '../../../types';

/**
 * @param query         - Query with parameters to fetch brands.
 * @param useCache      - If the request result will be cached.
 * @param setBrandsHash - Allows the brands hash to be set.
 * @param config        - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch brands for
 * a given query or all brands if no query is provided.
 *
 * @param getBrands - Get brands client.
 *
 * @returns - Thunk factory.
 */
const fetchBrandsFactory =
  (getBrands: GetBrands) =>
  (
    query: BrandsQuery,
    useCache = false,
    setBrandsHash = true,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<FetchBrandsAction>,
    getState: () => StoreState,
  ): Promise<Brands | undefined> => {
    let hash: string | undefined = undefined;

    try {
      hash = generateBrandsHash(query);
      // Check if brands data is already fetched.
      // If it is, let the calling code know there's nothing to wait for.
      // If not, dispatch an action to fetch the brands data.
      if (isBrandsResultCached(getState(), hash)) {
        if (useCache) {
          if (!setBrandsHash) {
            return;
          }

          dispatch({
            meta: { hash, query },
            type: actionTypes.SET_BRANDS_HASH,
          });

          return;
        } else {
          dispatch({
            type: actionTypes.RESET_BRANDS_STATE,
          });
        }
      }

      if (setBrandsHash) {
        dispatch({
          meta: { hash, query },
          type: actionTypes.SET_BRANDS_HASH,
        });
      }

      dispatch({
        meta: { hash, query },
        type: actionTypes.FETCH_BRANDS_REQUEST,
      });

      const result = await getBrands(query, config);

      dispatch({
        meta: { hash, query },
        payload: normalize(result, {
          entries: [brand],
        }),
        type: actionTypes.FETCH_BRANDS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { hash: hash as string, query },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_BRANDS_FAILURE,
      });

      throw error;
    }
  };

export default fetchBrandsFactory;
