import * as actionTypes from '../actionTypes.js';
import type { AnyAction } from 'redux';
import type {
  SearchHash as Hash,
  SearchSuggestionsState,
} from '../types/index.js';

export const INITIAL_STATE: Record<Hash, SearchSuggestionsState> = {};

const searchSuggestionsReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_SUGGESTIONS_REQUEST:
      return {
        ...state,
        [action.meta.hash]: {
          result: null,
          isLoading: true,
          error: null,
          query: action.meta.query,
        },
      };
    case actionTypes.FETCH_SEARCH_SUGGESTIONS_FAILURE:
      return {
        ...state,
        [action.meta.hash]: {
          result: null,
          isLoading: false,
          error: action.payload.error,
          query: action.meta.query,
        },
      };
    case actionTypes.FETCH_SEARCH_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        [action.meta.hash]: {
          result: action.payload.result,
          isLoading: false,
          error: false,
          query: action.meta.query,
        },
      };
    case actionTypes.RESET_SEARCH_SUGGESTIONS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default searchSuggestionsReducer;
