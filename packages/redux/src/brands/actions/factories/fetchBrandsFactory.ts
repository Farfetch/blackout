import * as actionTypes from '../../actionTypes.js';
import {
  type Brands,
  type Config,
  type GetBrands,
  type GetBrandsQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { generateBrandsHash } from '../../utils/index.js';
import { isBrandsResultCached } from '../../selectors.js';
import { normalize } from 'normalizr';
import brand from '../../../entities/schemas/brand.js';
import type { Dispatch } from 'redux';
import type { FetchBrandsAction } from '../../types/index.js';
import type { StoreState } from '../../../types/index.js';

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
  (query: GetBrandsQuery = {}, useCache = false, config?: Config) =>
  async (
    dispatch: Dispatch<FetchBrandsAction>,
    getState: () => StoreState,
  ): Promise<Brands | undefined> => {
    let hash: string | undefined = undefined;

    try {
      hash = generateBrandsHash(query);

      // Check if brands data is already fetched.
      // If it is, return immediately.
      // If not, dispatch an action to fetch the brands data.
      if (isBrandsResultCached(getState(), query) && useCache) {
        return;
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { hash: hash as string, query },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_BRANDS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchBrandsFactory;
