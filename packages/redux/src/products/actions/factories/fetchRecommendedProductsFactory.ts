import * as actionTypes from '../../actionTypes';
import { adaptRecommendedProducts } from '../../../helpers/adapters';
import {
  GetRecommendedProducts,
  RecommendedProductsResult,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchRecommendedProductsAction } from '../../types';
import type { FetchRecommendedProductsFactory } from './types';

/**
 * Method responsible for retrieving recommendations for a product based on a
 * strategy.
 *
 * @param getRecommendedProducts - Get product recommendations client.
 *
 * @returns Thunk factory.
 */
const fetchRecommendedProductsFactory: FetchRecommendedProductsFactory<
  GetRecommendedProducts
> =
  getRecommendedProducts =>
  (query, config) =>
  async (
    dispatch: Dispatch<FetchRecommendedProductsAction>,
  ): Promise<RecommendedProductsResult[]> => {
    const { strategyName } = query;

    try {
      dispatch({
        type: actionTypes.FETCH_RECOMMENDED_PRODUCTS_REQUEST,
        meta: { strategyName },
      });

      const result = await getRecommendedProducts(query, config);
      const recommendations = adaptRecommendedProducts(result);

      dispatch({
        type: actionTypes.FETCH_RECOMMENDED_PRODUCTS_SUCCESS,
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
        type: actionTypes.FETCH_RECOMMENDED_PRODUCTS_FAILURE,
        payload: { error: toBlackoutError(error) },
        meta: { strategyName },
      });

      throw error;
    }
  };

export default fetchRecommendedProductsFactory;
