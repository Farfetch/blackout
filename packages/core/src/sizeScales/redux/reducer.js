/**
 * @module sizeScales/reducer
 * @category SizeScales
 * @subcategory Reducer
 */
import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import isEmpty from 'lodash/isEmpty';

export const INITIAL_STATE = {
  error: null,
  errorById: {},
  errorByQuery: {},
  isLoading: false,
  isLoadingById: {},
  isLoadingByQuery: {},
  mappings: {
    error: {},
    isLoading: {},
    result: {},
  },
};

const error = (
  state = INITIAL_STATE.error,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_SIZESCALES_REQUEST:
      if (isEmpty(action.meta.query)) {
        return INITIAL_STATE.error;
      }

      return state;
    case actionTypes.GET_SIZESCALES_FAILURE:
      if (isEmpty(action.meta.query)) {
        return action.payload.error;
      }

      return state;
    default:
      return state;
  }
};

const errorById = (
  state = INITIAL_STATE.errorById,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_SIZESCALE_REQUEST:
      return {
        ...state,
        [action.meta.sizeScaleId]: undefined,
      };
    case actionTypes.GET_SIZESCALE_FAILURE:
      return {
        ...state,
        [action.meta.sizeScaleId]: action.payload.error,
      };
    default:
      return state;
  }
};

const errorByQuery = (
  state = INITIAL_STATE.errorByQuery,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_SIZESCALES_REQUEST:
      if (isEmpty(action.meta.query)) {
        return state;
      }

      return {
        ...state,
        [action.meta.query.categoryId]: undefined,
      };
    case actionTypes.GET_SIZESCALES_FAILURE:
      if (isEmpty(action.meta.query)) {
        return state;
      }

      return {
        ...state,
        [action.meta.query.categoryId]: action.payload.error,
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
    case actionTypes.GET_SIZESCALES_REQUEST:
      if (isEmpty(action.meta.query)) {
        return true;
      }

      return state;
    case actionTypes.GET_SIZESCALES_SUCCESS:
    case actionTypes.GET_SIZESCALES_FAILURE:
      if (isEmpty(action.meta.query)) {
        return INITIAL_STATE.isLoading;
      }

      return state;
    default:
      return state;
  }
};

const isLoadingById = (
  state = INITIAL_STATE.isLoadingById,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_SIZESCALE_REQUEST:
      return {
        ...state,
        [action.meta.sizeScaleId]: true,
      };
    case actionTypes.GET_SIZESCALE_SUCCESS:
      return { ...state, [action.meta.sizeScaleId]: false };
    case actionTypes.GET_SIZESCALE_FAILURE:
      return { ...state, [action.meta.sizeScaleId]: undefined };
    default:
      return state;
  }
};

const isLoadingByQuery = (
  state = INITIAL_STATE.isLoadingByQuery,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_SIZESCALES_REQUEST:
      if (isEmpty(action.meta.query)) {
        return state;
      }

      return {
        ...state,
        [action.meta.query.categoryId]: true,
      };
    case actionTypes.GET_SIZESCALES_SUCCESS:
      if (isEmpty(action.meta.query)) {
        return state;
      }

      return { ...state, [action.meta.query.categoryId]: false };
    case actionTypes.GET_SIZESCALES_FAILURE:
      if (isEmpty(action.meta.query)) {
        return state;
      }

      return { ...state, [action.meta.query.categoryId]: undefined };
    default:
      return state;
  }
};

const mappings = (
  state = INITIAL_STATE.mappings,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.FETCH_SIZESCALE_MAPPINGS_REQUEST:
      return {
        ...state,
        error: {
          ...state.error,
          [action.meta.hash]: undefined,
        },
        isLoading: {
          ...state.isLoading,
          [action.meta.hash]: true,
        },
      };
    case actionTypes.FETCH_SIZESCALE_MAPPINGS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.hash]: false,
        },
        result: {
          ...state.result,
          [action.meta.hash]: action.payload.result,
        },
      };
    case actionTypes.FETCH_SIZESCALE_MAPPINGS_FAILURE:
      return {
        ...state,
        error: {
          ...state.error,
          [action.meta.hash]: action.payload.error,
        },
        isLoading: {
          ...state.isLoading,
          [action.meta.hash]: false,
        },
      };
    default:
      return state;
  }
};

export const getError = state => state.error;
export const getErrorById = state => state.errorById;
export const getErrorByQuery = state => state.errorByQuery;
export const getIsLoading = state => state.isLoading;
export const getIsLoadingById = state => state.isLoadingById;
export const getIsLoadingByQuery = state => state.isLoadingByQuery;
export const getMappingError = state => state.mappings.error;
export const getMappingIsLoading = state => state.mappings.isLoading;
export const getMappingResult = state => state.mappings.result;

const reducers = combineReducers({
  error,
  errorById,
  errorByQuery,
  isLoading,
  isLoadingById,
  isLoadingByQuery,
  mappings,
});

/**
 * Reducer for sizeScales state.
 *
 * @function sizeScalesReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default (state, action = {}) => {
  if (action.type === actionTypes.RESET_SIZESCALES) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};
