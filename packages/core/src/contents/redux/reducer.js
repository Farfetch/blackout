/**
 * @module contents/reducer
 * @category Contents
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';

export const INITIAL_STATE = {
  error: {},
  isLoading: {},
  contentTypes: {
    error: {},
    isLoading: {},
    result: null,
  },
  metadata: {
    error: {},
    isLoading: {},
    result: null,
  },
};

const error = (state = INITIAL_STATE.error, action) => {
  switch (action.type) {
    case actionTypes.GET_CONTENT_REQUEST:
    case actionTypes.GET_COMMERCE_PAGES_REQUEST:
      return {
        ...state,
        [action.payload.hash]: null,
      };
    case actionTypes.GET_CONTENT_FAILURE:
    case actionTypes.GET_COMMERCE_PAGES_FAILURE:
      return {
        ...state,
        [action.payload.hash]: action.payload.error,
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
    case actionTypes.GET_CONTENT_REQUEST:
    case actionTypes.GET_COMMERCE_PAGES_REQUEST:
      return {
        ...state,
        [action.payload.hash]: true,
      };
    case actionTypes.GET_CONTENT_SUCCESS:
    case actionTypes.GET_COMMERCE_PAGES_SUCCESS:
      return {
        ...state,
        [action.payload.hash]: false,
      };
    case actionTypes.GET_CONTENT_FAILURE:
    case actionTypes.GET_COMMERCE_PAGES_FAILURE:
      return {
        ...state,
        [action.payload.hash]: undefined,
      };
    default:
      return state;
  }
};

const contentTypes = (
  state = INITIAL_STATE.contentTypes,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_CONTENT_TYPES_REQUEST:
      return {
        isLoading: true,
        error: INITIAL_STATE.contentTypes.error,
      };
    case actionTypes.GET_CONTENT_TYPES_SUCCESS:
      return {
        result: action.payload,
        isLoading: false,
      };
    case actionTypes.GET_CONTENT_TYPES_FAILURE:
      return {
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const metadata = (
  state = INITIAL_STATE.metadata,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_SEO_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.pathname]: true,
        },
        error: {
          ...state.error,
          [action.payload.pathname]: null,
        },
      };
    case actionTypes.GET_SEO_SUCCESS:
      return {
        ...state,
        result: {
          ...state.result,
          [action.payload.pathname]: action.payload.result,
        },
        isLoading: {
          ...state.isLoading,
          [action.payload.pathname]: false,
        },
      };
    case actionTypes.GET_SEO_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.pathname]: undefined,
        },
        error: {
          ...state.error,
          [action.payload.pathname]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

export const getError = state => state.error;
export const getIsLoading = state => state.isLoading;
export const getContentType = state => state.contentTypes.result;
export const getSEOmetadata = state => state.metadata;

const reducers = combineReducers({
  error,
  isLoading,
  contentTypes,
  metadata,
});

/**
 * Reducer for contents state.
 *
 * @function contentsReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default (state, action = {}) => {
  if (action.type === actionTypes.RESET_CONTENTS) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};
