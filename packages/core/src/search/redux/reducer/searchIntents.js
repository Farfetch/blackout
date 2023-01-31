import * as actionTypes from '../actionTypes';
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
    // @TODO: Remove next line in version 2.0.0.
    case actionTypes.GET_SEARCH_REQUEST:
    case actionTypes.GET_SEARCH_INTENTS_REQUEST:
      return INITIAL_STATE.error;
    // @TODO: Remove next line in version 2.0.0.
    case actionTypes.GET_SEARCH_FAILURE:
    case actionTypes.GET_SEARCH_INTENTS_FAILURE:
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
    // @TODO: Remove next line in version 2.0.0.
    case actionTypes.GET_SEARCH_REQUEST:
    case actionTypes.GET_SEARCH_INTENTS_REQUEST:
      return true;
    // @TODO: Remove next line in version 2.0.0.
    case actionTypes.GET_SEARCH_SUCCESS:
    case actionTypes.GET_SEARCH_INTENTS_SUCCESS:
      return INITIAL_STATE.isLoading;
    // @TODO: Remove next line in version 2.0.0.
    case actionTypes.GET_SEARCH_FAILURE:
    case actionTypes.GET_SEARCH_INTENTS_FAILURE:
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
    // @TODO: Remove next two lines in version 2.0.0.
    case actionTypes.GET_SEARCH_SUCCESS:
      return action.payload;
    case actionTypes.GET_SEARCH_INTENTS_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

export const getError = state => state.error;
export const getIsLoading = state => state.isLoading;
export const getResult = state => state.result;

const reducer = combineReducers({
  error,
  isLoading,
  result,
});

/**
 * Reducer for search intents state.
 *
 * @function searchIntentsReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default (state, action = {}) => {
  if (
    // @TODO: Remove next line in version 2.0.0.
    action.type === actionTypes.RESET_SEARCH ||
    action.type === actionTypes.RESET_SEARCH_INTENTS
  ) {
    return reducer(INITIAL_STATE, action);
  }

  return reducer(state, action);
};
