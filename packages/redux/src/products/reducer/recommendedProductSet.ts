import * as actionTypes from '../actionTypes/index.js';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import type { RecommendedProductSetState } from '../types/index.js';

export const INITIAL_STATE: RecommendedProductSetState = {
  error: {},
  isLoading: {},
  result: {},
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_RECOMMENDED_PRODUCT_SET_REQUEST:
      return {
        ...state,
        [action.meta.recommendedProductSetId]: undefined,
      };
    case actionTypes.FETCH_RECOMMENDED_PRODUCT_SET_FAILURE:
      return {
        ...state,
        [action.meta.recommendedProductSetId]: action.payload.error,
      };
    default:
      return state;
  }
};

const result = (state = INITIAL_STATE.result, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_RECOMMENDED_PRODUCT_SET_SUCCESS:
      return {
        ...state,
        [action.meta.recommendedProductSetId]: action.payload.result,
      };
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_RECOMMENDED_PRODUCT_SET_REQUEST:
      return {
        ...state,
        [action.meta.recommendedProductSetId]: true,
      };
    case actionTypes.FETCH_RECOMMENDED_PRODUCT_SET_SUCCESS:
      return {
        ...state,
        [action.meta.recommendedProductSetId]: false,
      };
    case actionTypes.FETCH_RECOMMENDED_PRODUCT_SET_FAILURE:
      return {
        ...state,
        [action.meta.recommendedProductSetId]: undefined,
      };
    default:
      return state;
  }
};

export const getError = (
  state: RecommendedProductSetState,
): RecommendedProductSetState['error'] => state.error;
export const getResult = (
  state: RecommendedProductSetState,
): RecommendedProductSetState['result'] => state.result;
export const getIsLoading = (
  state: RecommendedProductSetState,
): RecommendedProductSetState['isLoading'] => state.isLoading;

const recommendedSetsReducer: Reducer<RecommendedProductSetState> =
  combineReducers({
    error,
    isLoading,
    result,
  });

export default recommendedSetsReducer;
