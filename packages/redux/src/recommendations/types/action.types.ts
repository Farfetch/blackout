import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { ProductRecommendation } from '@farfetch/blackout-client/recommendations/types';

interface FetchProductRecommendationsRequestAction extends Action {
  type: typeof actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_REQUEST;
  meta: { strategyName: string };
}

interface FetchProductRecommendationsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_SUCCESS;
  payload: ProductRecommendation;
  meta: { strategyName: string };
}

interface FetchProductRecommendationsFailureAction extends Action {
  type: typeof actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_FAILURE;
  payload: { error: BlackoutError };
  meta: { strategyName: string };
}

/**
 * Actions dispatched when the fetch form schema request is made.
 */
export type FetchProductRecommendationsAction =
  | FetchProductRecommendationsRequestAction
  | FetchProductRecommendationsSuccessAction
  | FetchProductRecommendationsFailureAction;
