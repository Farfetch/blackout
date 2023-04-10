import * as actionTypes from '../../actionTypes/index.js';
import {
  type Config,
  type GetRecommendedProductSet,
  type RecommendedProductSet,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchRecommendedProductSetAction } from '../../types/index.js';

/**
 * Creates a thunk factory configured with the specified client to fetch a specific recommended
 * product set.
 *
 * @param getRecommendedProductSet - Get recommended product set client.
 *
 * @returns Thunk factory.
 */
const fetchRecommendedProductSetFactory =
  (getRecommendedProductSet: GetRecommendedProductSet) =>
  (recommendedProductSetId: number, config?: Config) =>
  async (
    dispatch: Dispatch<FetchRecommendedProductSetAction>,
  ): Promise<RecommendedProductSet> => {
    try {
      dispatch({
        meta: { recommendedProductSetId },
        type: actionTypes.FETCH_RECOMMENDED_PRODUCT_SET_REQUEST,
      });

      const result = await getRecommendedProductSet(
        recommendedProductSetId,
        config,
      );

      dispatch({
        meta: { recommendedProductSetId },
        payload: { result },
        type: actionTypes.FETCH_RECOMMENDED_PRODUCT_SET_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { recommendedProductSetId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_RECOMMENDED_PRODUCT_SET_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchRecommendedProductSetFactory;
