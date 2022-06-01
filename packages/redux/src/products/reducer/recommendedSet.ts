import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type {
  FetchRecommendedSetAction,
  FetchRecommendedSetFailureAction,
  FetchRecommendedSetRequestAction,
  FetchRecommendedSetSuccessAction,
  State,
} from '../types';

export const INITIAL_STATE: State['recommendedSets'] = {
  error: {},
  isLoading: {},
  result: {},
};

const error = (
  state = INITIAL_STATE.error,
  action: FetchRecommendedSetAction,
) => {
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

const result = (
  state = INITIAL_STATE.result,
  action: FetchRecommendedSetAction,
) => {
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

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action:
    | FetchRecommendedSetRequestAction
    | FetchRecommendedSetSuccessAction
    | FetchRecommendedSetFailureAction
    | AnyAction,
) => {
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
  state: State['recommendedSets'],
): State['recommendedSets']['error'] => state.error;
export const getResult = (
  state: State['recommendedSets'],
): State['recommendedSets']['result'] => state.result;
export const getIsLoading = (
  state: State['recommendedSets'],
): State['recommendedSets']['isLoading'] => state.isLoading;

export const recommendedSetsReducer = combineReducers({
  error,
  isLoading,
  result,
});
