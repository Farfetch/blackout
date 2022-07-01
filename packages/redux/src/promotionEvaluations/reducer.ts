import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type {
  FetchPromotionEvaluationItemsAction,
  FetchPromotionEvaluationItemsSuccessAction,
  PromotionEvaluationsState,
} from './types';

export const INITIAL_STATE: PromotionEvaluationsState = {
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

export const getError = (
  state: PromotionEvaluationsState,
): PromotionEvaluationsState['error'] => state.error;
export const getIsLoading = (
  state: PromotionEvaluationsState,
): PromotionEvaluationsState['isLoading'] => state.isLoading;
export const getResult = (
  state: PromotionEvaluationsState,
): PromotionEvaluationsState['result'] => state.result;
export const getId = (
  state: PromotionEvaluationsState,
): PromotionEvaluationsState['id'] => state.id;

export default combineReducers({
  error,
  id,
  isLoading,
  result,
});
