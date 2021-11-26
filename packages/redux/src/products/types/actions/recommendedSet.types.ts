import type * as actionTypes from '../../actionTypes';
import type { Action } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type { RecommendedSet } from '@farfetch/blackout-client/products/types';

export interface FetchRecommendedSetRequestAction extends Action {
  meta: { recommendedSetId: RecommendedSet['id'] };
  type: typeof actionTypes.FETCH_RECOMMENDED_SET_REQUEST;
}

export interface FetchRecommendedSetSuccessAction extends Action {
  meta: { recommendedSetId: RecommendedSet['id'] };
  payload: { result: RecommendedSet };
  type: typeof actionTypes.FETCH_RECOMMENDED_SET_SUCCESS;
}

export interface FetchRecommendedSetFailureAction extends Action {
  meta: { recommendedSetId: RecommendedSet['id'] };
  payload: { error: Error };
  type: typeof actionTypes.FETCH_RECOMMENDED_SET_FAILURE;
}

/** Actions dispatched when the fetch a recommended set request is made. */
export type FetchRecommendedSetAction =
  | FetchRecommendedSetRequestAction
  | FetchRecommendedSetSuccessAction
  | FetchRecommendedSetFailureAction;
