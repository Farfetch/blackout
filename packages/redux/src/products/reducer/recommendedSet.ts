import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type {
  FetchRecommendedSetAction,
  FetchRecommendedSetFailureAction,
  FetchRecommendedSetRequestAction,
  FetchRecommendedSetSuccessAction,
  ProductsState,
} from '../types';

export const INITIAL_STATE: ProductsState['recommendedSets'] = {
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
  state: ProductsState['recommendedSets'],
): ProductsState['recommendedSets']['error'] => state.error;
export const getResult = (
  state: ProductsState['recommendedSets'],
): ProductsState['recommendedSets']['result'] => state.result;
export const getIsLoading = (
  state: ProductsState['recommendedSets'],
): ProductsState['recommendedSets']['isLoading'] => state.isLoading;

export const recommendedSetsReducer = combineReducers({
  error,
  isLoading,
  result,
});
