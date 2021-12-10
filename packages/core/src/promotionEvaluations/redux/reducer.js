/**
 * @module promotionEvaluations/reducer
 * @category Promotion Evaluations
 * @subcategory Reducer
 */
import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';

export const INITIAL_STATE = {
  id: null,
  error: null,
  isLoading: false,
  result: null,
};

const error = (
  state = INITIAL_STATE.error,
  /* istanbul ignore next */ action = {},
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
  /* istanbul ignore next */ action = {},
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
  /* istanbul ignore next */ action = {},
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
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_SUCCESS:
      return action.meta.promotionEvaluationId;
    default:
      return state;
  }
};

export const getError = state => state.error;
export const getIsLoading = state => state.isLoading;
export const getResult = state => state.result;
export const getId = state => state.id;

export default combineReducers({
  error,
  id,
  isLoading,
  result,
});
