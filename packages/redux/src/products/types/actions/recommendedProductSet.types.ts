import type * as actionTypes from '../../actionTypes/index.js';
import type { Action } from 'redux';
import type {
  BlackoutError,
  RecommendedProductSet,
} from '@farfetch/blackout-client';

export interface FetchRecommendedProductSetRequestAction extends Action {
  meta: { recommendedProductSetId: RecommendedProductSet['id'] };
  type: typeof actionTypes.FETCH_RECOMMENDED_PRODUCT_SET_REQUEST;
}

export interface FetchRecommendedProductSetSuccessAction extends Action {
  meta: { recommendedProductSetId: RecommendedProductSet['id'] };
  payload: { result: RecommendedProductSet };
  type: typeof actionTypes.FETCH_RECOMMENDED_PRODUCT_SET_SUCCESS;
}

export interface FetchRecommendedProductSetFailureAction extends Action {
  meta: { recommendedProductSetId: RecommendedProductSet['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_RECOMMENDED_PRODUCT_SET_FAILURE;
}

/**
 * Actions dispatched when the fetch a recommended product set request is made.
 */
export type FetchRecommendedProductSetAction =
  | FetchRecommendedProductSetRequestAction
  | FetchRecommendedProductSetSuccessAction
  | FetchRecommendedProductSetFailureAction;
