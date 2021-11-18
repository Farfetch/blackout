/**
 * @module brands/reducer
 * @category Brands
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';

export const INITIAL_STATE = {
  error: {},
  hash: null,
  isLoading: {},
  result: null,
};

const error = (
  state = INITIAL_STATE.error,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.FETCH_BRAND_REQUEST:
      return {
        ...state,
        [action.meta.brandId]: null,
      };
    case actionTypes.FETCH_BRANDS_REQUEST:
      return {
        ...state,
        [action.meta.hash]: null,
      };
    case actionTypes.FETCH_BRAND_FAILURE:
      return {
        ...state,
        [action.meta.brandId]: action.payload.error,
      };
    case actionTypes.FETCH_BRANDS_FAILURE:
      return {
        ...state,
        [action.meta.hash]: action.payload.error,
      };
    default:
      return state;
  }
};

const hash = (
  state = INITIAL_STATE.hash,
  /* istanbul ignore next */ action = {},
) => {
  if (action.type === actionTypes.SET_BRANDS_HASH) {
    return action.meta.hash;
  }
  return state;
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.FETCH_BRAND_REQUEST:
      return {
        ...state,
        [action.meta.brandId]: true,
      };
    case actionTypes.FETCH_BRANDS_REQUEST:
      return {
        ...state,
        [action.meta.hash]: true,
      };
    case actionTypes.FETCH_BRAND_SUCCESS:
    case actionTypes.FETCH_BRAND_FAILURE:
      return {
        ...state,
        [action.meta.brandId]: false,
      };
    case actionTypes.FETCH_BRANDS_SUCCESS:
    case actionTypes.FETCH_BRANDS_FAILURE:
      return {
        ...state,
        [action.meta.hash]: false,
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
    case actionTypes.FETCH_BRANDS_SUCCESS:
      return { ...state, [action.meta.hash]: action.payload.result };
    default:
      return state;
  }
};

export const getError = state => state.error;
export const getHash = state => state.hash;
export const getIsLoading = state => state.isLoading;
export const getResult = state => state.result;

const reducers = combineReducers({
  error,
  hash,
  isLoading,
  result,
});

/**
 * Reducer for brands state.
 *
 * @function brandsReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */

export default (state, action = {}) => {
  if (action.type === actionTypes.RESET_BRANDS_STATE) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};
