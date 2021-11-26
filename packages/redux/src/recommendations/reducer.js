/**
 * @module recommendations/reducer
 * @category Recommendations
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';

export const INITIAL_STATE = {
  error: {},
  isLoading: {},
  result: null,
};

const error = (
  state = INITIAL_STATE.error,
  /* istanbul ignore next */ action = {},
) => {
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

const isLoading = (
  state = INITIAL_STATE.isLoading,
  /* istanbul ignore next */ action = {},
) => {
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
  /* istanbul ignore next */ action = {},
) => {
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

export const getRecommendationsError = state => state.error;
export const getAreRecommendationsLoading = state => state.isLoading;
export const getRecommendations = state => state.result;

/**
 * Reducer for product recommendations state.
 *
 * @function recommendationsReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default combineReducers({
  error,
  isLoading,
  result,
});
