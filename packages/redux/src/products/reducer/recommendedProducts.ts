import * as actionTypes from '../actionTypes';
import * as authenticationActionTypes from '../../users/authentication/actionTypes';
import { AnyAction, combineReducers, Reducer } from 'redux';
import type { RecommendedProductsState } from '../types';

export const INITIAL_STATE: RecommendedProductsState = {
  error: {},
  isLoading: {},
  result: {},
};

const error = (
  state = INITIAL_STATE.error,
  action: AnyAction,
): RecommendedProductsState['error'] => {
  switch (action.type) {
    case actionTypes.FETCH_RECOMMENDED_PRODUCTS_REQUEST:
      return {
        ...state,
        [action.meta.strategyName]: undefined,
      };
    case actionTypes.FETCH_RECOMMENDED_PRODUCTS_FAILURE:
      return {
        ...state,
        [action.meta.strategyName]: action.payload.error,
      };
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: AnyAction,
): RecommendedProductsState['isLoading'] => {
  switch (action.type) {
    case actionTypes.FETCH_RECOMMENDED_PRODUCTS_REQUEST:
      return {
        ...state,
        [action.meta.strategyName]: true,
      };
    case actionTypes.FETCH_RECOMMENDED_PRODUCTS_SUCCESS:
      return {
        ...state,
        [action.meta.strategyName]: false,
      };
    case actionTypes.FETCH_RECOMMENDED_PRODUCTS_FAILURE:
      return {
        ...state,
        [action.meta.strategyName]: undefined,
      };
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  action: AnyAction,
): RecommendedProductsState['result'] => {
  switch (action.type) {
    case actionTypes.FETCH_RECOMMENDED_PRODUCTS_SUCCESS:
      return {
        ...state,
        [action.meta.strategyName]: action.payload,
      };
    default:
      return state;
  }
};

export const getRecommendedProductsErrors = (
  state: RecommendedProductsState = INITIAL_STATE,
): RecommendedProductsState['error'] | undefined => state?.error;

export const getAreRecommendedProductsLoading = (
  state: RecommendedProductsState = INITIAL_STATE,
): RecommendedProductsState['isLoading'] | undefined => state?.isLoading;

export const getRecommendedProductsResult = (
  state: RecommendedProductsState = INITIAL_STATE,
): RecommendedProductsState['result'] | undefined => state?.result;

const reducers = combineReducers({
  isLoading,
  error,
  result,
});

/**
 * Reducer for forms state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const recommendationsReducer: Reducer<RecommendedProductsState> = (
  state = INITIAL_STATE,
  action,
) => {
  if (
    action.type === actionTypes.RESET_RECOMMENDED_PRODUCTS ||
    action.type === authenticationActionTypes.LOGOUT_SUCCESS
  ) {
    // initial state should return when reset_recommended_products or logout actions are called.
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};

export default recommendationsReducer;
