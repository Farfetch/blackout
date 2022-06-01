import {
  FETCH_RECOMMENDED_SET_FAILURE,
  FETCH_RECOMMENDED_SET_REQUEST,
  FETCH_RECOMMENDED_SET_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';
import type { FetchRecommendedSetAction } from '../../types';
import type {
  GetRecommendedSet,
  RecommendedSet,
} from '@farfetch/blackout-client/products/types';

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
 * @param getRecommendedSet - Get product sizes client.
 *
 * @returns Thunk factory.
 */
const fetchRecommendedSet =
  (getRecommendedSet: GetRecommendedSet) =>
  (recommendedSetId: number, config?: Record<string, unknown>) =>
  async (
    dispatch: Dispatch<FetchRecommendedSetAction>,
  ): Promise<RecommendedSet> => {
    dispatch({
      meta: { recommendedSetId },
      type: FETCH_RECOMMENDED_SET_REQUEST,
    });

    try {
      const result = await getRecommendedSet(recommendedSetId, config);

      dispatch({
        meta: { recommendedSetId },
        payload: { result },
        type: FETCH_RECOMMENDED_SET_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { recommendedSetId },
        payload: { error },
        type: FETCH_RECOMMENDED_SET_FAILURE,
      });

      throw error;
    }
  };

export default fetchRecommendedSet;
