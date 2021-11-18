import * as actionTypes from '../actionTypes';
import { combineReducers } from 'redux';

export const INITIAL_STATE = {
  error: null,
  isLoading: false,
  query: null,
  result: null,
};

const error = (
  state = INITIAL_STATE.error,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_SEARCH_DID_YOU_MEAN_REQUEST:
      return INITIAL_STATE.error;
    case actionTypes.GET_SEARCH_DID_YOU_MEAN_FAILURE:
      return action.payload.error;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_SEARCH_DID_YOU_MEAN_REQUEST:
      return true;
    case actionTypes.GET_SEARCH_DID_YOU_MEAN_SUCCESS:
    case actionTypes.GET_SEARCH_DID_YOU_MEAN_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const query = (
  state = INITIAL_STATE.query,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_SEARCH_DID_YOU_MEAN_REQUEST:
      return action.meta.query;
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_SEARCH_DID_YOU_MEAN_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

export const getError = state => state.error;
export const getIsLoading = state => state.isLoading;
export const getQuery = state => state.query;
export const getResult = state => state.result;

const reducer = combineReducers({
  error,
  isLoading,
  query,
  result,
});

/**
 * Reducer for search did you mean state.
 *
 * @function searchDidYouMeanReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default (state, action = {}) => {
  if (action.type === actionTypes.RESET_SEARCH_DID_YOU_MEAN) {
    return reducer(INITIAL_STATE, action);
  }

  return reducer(state, action);
};
