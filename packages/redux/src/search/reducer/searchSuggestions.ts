import * as actionTypes from '../actionTypes';
import { combineReducers } from 'redux';
import type {
  FetchSearchSuggestionsAction,
  ResetSearchSuggestionsAction,
  SearchSuggestionsState,
} from '../types';

export const INITIAL_STATE: SearchSuggestionsState = {
  error: null,
  isLoading: false,
  query: null,
  result: null,
};

const error = (
  state = INITIAL_STATE.error,
  action: FetchSearchSuggestionsAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_SUGGESTIONS_REQUEST:
      return INITIAL_STATE.error;
    case actionTypes.FETCH_SEARCH_SUGGESTIONS_FAILURE:
      return action.payload.error;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: FetchSearchSuggestionsAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_SUGGESTIONS_REQUEST:
      return true;
    case actionTypes.FETCH_SEARCH_SUGGESTIONS_SUCCESS:
    case actionTypes.FETCH_SEARCH_SUGGESTIONS_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const query = (
  state = INITIAL_STATE.query,
  action: FetchSearchSuggestionsAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_SUGGESTIONS_REQUEST:
      return action.meta.query;
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  action: FetchSearchSuggestionsAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_SUGGESTIONS_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

export const getError = (
  state: SearchSuggestionsState,
): SearchSuggestionsState['error'] => state.error;
export const getIsLoading = (
  state: SearchSuggestionsState,
): SearchSuggestionsState['isLoading'] => state.isLoading;
export const getQuery = (
  state: SearchSuggestionsState,
): SearchSuggestionsState['query'] => state.query;
export const getResult = (
  state: SearchSuggestionsState,
): SearchSuggestionsState['result'] => state.result;

const reducer = combineReducers({
  error,
  isLoading,
  query,
  result,
});

/**
 * Reducer for search suggestions state.
 *
 * @function searchSuggestionsReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
const searchSuggestionsReducer = (
  state: SearchSuggestionsState,
  action: FetchSearchSuggestionsAction | ResetSearchSuggestionsAction,
): SearchSuggestionsState => {
  if (action.type === actionTypes.RESET_SEARCH_SUGGESTIONS) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default searchSuggestionsReducer;
