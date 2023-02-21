import * as actionTypes from '../actionTypes';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import type { RecommendedSetState } from '../types';

export const INITIAL_STATE: RecommendedSetState = {
  error: {},
  isLoading: {},
  result: {},
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_RECOMMENDED_SET_REQUEST:
      return {
        ...state,
        [action.meta.recommendedSetId]: undefined,
      };
    case actionTypes.FETCH_RECOMMENDED_SET_FAILURE:
      return {
        ...state,
        [action.meta.recommendedSetId]: action.payload.error,
      };
    default:
      return state;
  }
};

const result = (state = INITIAL_STATE.result, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_RECOMMENDED_SET_SUCCESS:
      return {
        ...state,
        [action.meta.recommendedSetId]: action.payload.result,
      };
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_RECOMMENDED_SET_REQUEST:
      return {
        ...state,
        [action.meta.recommendedSetId]: true,
      };
    case actionTypes.FETCH_RECOMMENDED_SET_SUCCESS:
      return {
        ...state,
        [action.meta.recommendedSetId]: false,
      };
    case actionTypes.FETCH_RECOMMENDED_SET_FAILURE:
      return {
        ...state,
        [action.meta.recommendedSetId]: undefined,
      };
    default:
      return state;
  }
};

export const getError = (
  state: RecommendedSetState,
): RecommendedSetState['error'] => state.error;
export const getResult = (
  state: RecommendedSetState,
): RecommendedSetState['result'] => state.result;
export const getIsLoading = (
  state: RecommendedSetState,
): RecommendedSetState['isLoading'] => state.isLoading;

const recommendedSetsReducer: Reducer<RecommendedSetState> = combineReducers({
  error,
  isLoading,
  result,
});

export default recommendedSetsReducer;
