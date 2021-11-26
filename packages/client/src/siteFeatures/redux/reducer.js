// @TODO: Remove this file in version 2.0.0.
/**
 * @module siteFeatures/reducer
 * @category SiteFeatures
 * @subcategory Reducer
 */
import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  result: null,
};

/**
 * Reducer for the siteFeatures state.
 *
 * @function siteFeaturesReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
const siteFeatures = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case actionTypes.FETCH_SITE_FEATURES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.FETCH_SITE_FEATURES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        result: action.payload.result,
      };
    case actionTypes.FETCH_SITE_FEATURES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export const getError = state => state.error;
export const getResult = state => state.result;
export const getIsLoading = state => state.isLoading;

export default siteFeatures;
