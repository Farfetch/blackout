import * as actionTypes from '../../actionTypes/index.js';
import {
  type Config,
  type GetProductRecommendedSet,
  type RecommendedSet,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchRecommendedSetAction } from '../../types/index.js';

/**
 * Creates a thunk factory configured with the specified client to fetch product
 * sizes for a given product id.
 *
 * @param getProductRecommendedSet - Get product recommended set client.
 *
 * @returns Thunk factory.
 */
const fetchRecommendedSetFactory =
  (getProductRecommendedSet: GetProductRecommendedSet) =>
  (recommendedSetId: number, config?: Config) =>
  async (
    dispatch: Dispatch<FetchRecommendedSetAction>,
  ): Promise<RecommendedSet> => {
    try {
      dispatch({
        meta: { recommendedSetId },
        type: actionTypes.FETCH_RECOMMENDED_SET_REQUEST,
      });

      const result = await getProductRecommendedSet(recommendedSetId, config);

      dispatch({
        meta: { recommendedSetId },
        payload: { result },
        type: actionTypes.FETCH_RECOMMENDED_SET_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { recommendedSetId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_RECOMMENDED_SET_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchRecommendedSetFactory;
