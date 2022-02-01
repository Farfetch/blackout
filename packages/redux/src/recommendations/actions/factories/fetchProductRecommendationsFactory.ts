import * as actionTypes from '../../actionTypes';
import { adaptProductRecommendations } from '@farfetch/blackout-client/helpers/adapters';
import type { Dispatch } from 'redux';
import type { FetchProductRecommendationsAction } from '../../types';
import type { FetchProductRecommendationsFactory } from './types';
import type {
  GetProductRecommendation,
  GetProductRecommendations,
} from '@farfetch/blackout-client/recommendations/types';

/**
 * Method responsible for retrieving recommendations for a product based on a
 * strategy.
 *
 * @param getProductRecommendations - Get product recommendations client.
 *
 * @returns Thunk factory.
 */
const fetchProductRecommendationsFactory: FetchProductRecommendationsFactory<
  GetProductRecommendations
> =
  getProductRecommendations =>
  // (productId, strategyName, config) =>
  (query, config) =>
  async (
    dispatch: Dispatch<FetchProductRecommendationsAction>,
  ): Promise<GetProductRecommendation[]> => {
    const { strategyName } = query;

    try {
      dispatch({
        type: actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_REQUEST,
        meta: { strategyName },
      });

      const result = await getProductRecommendations(query, config);
      const recommendations = adaptProductRecommendations(result);

      dispatch({
        type: actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_SUCCESS,
        payload: {
          id: recommendations.id,
          values: recommendations.values,
        },
        meta: {
          strategyName,
        },
      });

      return result;
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_FAILURE,
        payload: { error },
        meta: { strategyName },
      });

      throw error;
    }
  };

export default fetchProductRecommendationsFactory;
