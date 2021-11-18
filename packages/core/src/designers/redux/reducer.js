/**
 * @module designers/reducer
 * @category Designers
 * @subcategory Reducer
 */
import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';

export const INITIAL_STATE = {
  error: {},
  hash: null,
  isLoading: {},
};

const error = (
  state = INITIAL_STATE.error,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_DESIGNERS_REQUEST:
      return {
        ...state,
        [action.payload.hash]: undefined,
      };
    case actionTypes.GET_DESIGNERS_FAILURE:
      return {
        ...state,
        [action.payload.hash]: action.payload.error,
      };
    default:
      return state;
  }
};

const hash = (
  state = INITIAL_STATE.hash,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.SET_DESIGNER_RESULT_HASH:
      return action.payload.hash;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_DESIGNERS_REQUEST:
      return {
        ...state,
        [action.payload.hash]: true,
      };
    case actionTypes.GET_DESIGNERS_SUCCESS:
      return {
        ...state,
        [action.payload.hash]: false,
      };
    case actionTypes.GET_DESIGNERS_FAILURE:
      return {
        ...state,
        [action.payload.hash]: undefined,
      };
    default:
      return state;
  }
};

export const getError = state => state.error;
export const getHash = state => state.hash;
export const getIsLoading = state => state.isLoading;

const reducers = combineReducers({
  error,
  hash,
  isLoading,
});

/**
 * Reducer for designers state.
 *
 * @function designersReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default (state, action = {}) => {
  if (action.type === actionTypes.RESET_DESIGNERS) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};
