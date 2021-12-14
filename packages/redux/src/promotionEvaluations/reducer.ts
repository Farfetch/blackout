/**
 * @module promotionEvaluations/reducer
 * @category Promotion Evaluations
 * @subcategory Reducer
 */
import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type {
  FetchPromotionEvaluationItemsAction,
  FetchPromotionEvaluationItemsSuccessAction,
  State,
} from './types';

export const INITIAL_STATE: State = {
  id: null,
  error: null,
  isLoading: false,
  result: null,
};

const error = (
  state = INITIAL_STATE.error,
  action: FetchPromotionEvaluationItemsAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_REQUEST:
      return INITIAL_STATE.error;
    case actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_FAILURE:
      return action.payload.error;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: FetchPromotionEvaluationItemsAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_REQUEST:
      return true;
    case actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_SUCCESS:
    case actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  action: FetchPromotionEvaluationItemsSuccessAction | AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

const id = (
  state = INITIAL_STATE.id,
  action: FetchPromotionEvaluationItemsSuccessAction | AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_SUCCESS:
      return action.meta.promotionEvaluationId;
    default:
      return state;
  }
};

export const getError = (state: State): State['error'] => state.error;
export const getIsLoading = (state: State): State['isLoading'] =>
  state.isLoading;
export const getResult = (state: State): State['result'] => state.result;
export const getId = (state: State): State['id'] => state.id;

export default combineReducers({
  error,
  id,
  isLoading,
  result,
});
