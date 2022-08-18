import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers, Reducer } from 'redux';
import type { SearchSuggestionsState } from '../types';

export const INITIAL_STATE: SearchSuggestionsState = {
  error: null,
  isLoading: false,
  query: null,
  result: null,
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_SUGGESTIONS_REQUEST:
      return INITIAL_STATE.error;
    case actionTypes.FETCH_SEARCH_SUGGESTIONS_FAILURE:
      return action.payload.error;
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
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

const query = (state = INITIAL_STATE.query, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_SUGGESTIONS_REQUEST:
      return action.meta.query;
    default:
      return state;
  }
};

const result = (state = INITIAL_STATE.result, action: AnyAction) => {
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
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const searchSuggestionsReducer: Reducer<SearchSuggestionsState> = (
  state,
  action,
) => {
  if (action.type === actionTypes.RESET_SEARCH_SUGGESTIONS) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default searchSuggestionsReducer;
