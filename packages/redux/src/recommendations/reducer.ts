import * as actionTypes from './actionTypes';
import * as authenticationActionTypes from '../authentication/actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type { ProductRecommendationResult, State } from './types';
import type { ReducerSwitch } from '../types';

export const INITIAL_STATE: State = {
  error: {},
  isLoading: {},
  result: {},
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_REQUEST:
      return {
        ...state,
        [action.meta.strategyName]: undefined,
      };
    case actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_FAILURE:
      return {
        ...state,
        [action.meta.strategyName]: action.payload.error,
      };
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_REQUEST:
      return {
        ...state,
        [action.meta.strategyName]: true,
      };
    case actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        [action.meta.strategyName]: false,
      };
    case actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_FAILURE:
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
): ProductRecommendationResult => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        [action.meta.strategyName]: action.payload,
      };
    default:
      return state;
  }
};

export const getRecommendationsError = (
  state?: State,
): State['error'] | undefined => state?.error;
export const getAreRecommendationsLoading = (
  state?: State,
): State['isLoading'] | undefined => state?.isLoading;
export const getRecommendations = (
  state?: State,
): State['result'] | undefined => state?.result;

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
const recommendationsReducer: ReducerSwitch<State, AnyAction> = (
  state = INITIAL_STATE,
  action,
): State => {
  if (
    action.type === actionTypes.RESET_RECOMMENDATIONS ||
    action.type === authenticationActionTypes.LOGOUT_SUCCESS
  ) {
    // initial state should return when reset_recommendations or logout actions are called.
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};

export default recommendationsReducer;
