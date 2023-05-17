import type * as actionTypes from '../../actionTypes/index.js';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { RecommendedProductsResultNormalized } from '../../../helpers/adapters/types/index.js';

interface FetchRecommendedProductsRequestAction extends Action {
  type: typeof actionTypes.FETCH_RECOMMENDED_PRODUCTS_REQUEST;
  meta: { strategyName?: string };
}

interface FetchRecommendedProductsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_RECOMMENDED_PRODUCTS_SUCCESS;
  payload: RecommendedProductsResultNormalized;
  meta: { strategyName?: string };
}

interface FetchRecommendedProductsFailureAction extends Action {
  type: typeof actionTypes.FETCH_RECOMMENDED_PRODUCTS_FAILURE;
  payload: { error: BlackoutError };
  meta: { strategyName?: string };
}

/**
 * Actions dispatched when the fetch form schema request is made.
 */
export type FetchRecommendedProductsAction =
  | FetchRecommendedProductsRequestAction
  | FetchRecommendedProductsSuccessAction
  | FetchRecommendedProductsFailureAction;
