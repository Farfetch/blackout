import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetProductRecommendedSet,
  RecommendedSet,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchRecommendedSetAction } from '../../types';

/**
 * @param recommendedSetId - Numeric identifier of the product.
 * @param config           - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch product
 * sizes for a given product id.
 *
 * @param getProductRecommendedSet - Get product recommended set client.
 *
 * @returns Thunk factory.
 */
export const fetchRecommendedSetFactory =
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
      dispatch({
        meta: { recommendedSetId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_RECOMMENDED_SET_FAILURE,
      });

      throw error;
    }
  };
