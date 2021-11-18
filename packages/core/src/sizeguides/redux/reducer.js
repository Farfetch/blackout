/**
 * @module sizeGuides/reducer
 * @category SizeGuides
 * @subcategory Reducer
 */
import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';

export const INITIAL_STATE = {
  error: null,
  isLoading: false,
  result: null,
};

const error = (
  state = INITIAL_STATE.error,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_SIZEGUIDES_REQUEST:
      return INITIAL_STATE.error;
    case actionTypes.GET_SIZEGUIDES_FAILURE:
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
    case actionTypes.GET_SIZEGUIDES_REQUEST:
      return true;
    case actionTypes.GET_SIZEGUIDES_SUCCESS:
    case actionTypes.GET_SIZEGUIDES_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_SIZEGUIDES_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

export const getError = state => state.error;
export const getIsLoading = state => state.isLoading;
export const getResult = state => state.result;

const reducers = combineReducers({
  error,
  isLoading,
  result,
});

/**
 * Reducer for sizeGuides state.
 *
 * @function sizeGuidesReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default (state, action = {}) => {
  if (action.type === actionTypes.RESET_SIZEGUIDES) {
    return reducers(INITIAL_STATE, action);
  }
  return reducers(state, action);
};
