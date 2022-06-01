import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type {
  PromotionEvaluationId,
  PromotionEvaluationItem,
} from '@farfetch/blackout-client/promotionEvaluations/types';

export interface FetchPromotionEvaluationItemsFailureAction extends Action {
  meta: { promotionEvaluationId: PromotionEvaluationId };
  type: typeof actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_FAILURE;
  payload: { error: Error };
}
export interface FetchPromotionEvaluationItemsRequestAction extends Action {
  meta: { promotionEvaluationId: PromotionEvaluationId };
  type: typeof actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_REQUEST;
}
export interface FetchPromotionEvaluationItemsSuccessAction extends Action {
  meta: { promotionEvaluationId: PromotionEvaluationId };
  type: typeof actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_SUCCESS;
  payload: {
    result: Array<PromotionEvaluationItem>;
  };
}

/**
 * Actions dispatched when the fetch categories request is made.
 */
export type FetchPromotionEvaluationItemsAction =
  | FetchPromotionEvaluationItemsFailureAction
  | FetchPromotionEvaluationItemsRequestAction
  | FetchPromotionEvaluationItemsSuccessAction;
