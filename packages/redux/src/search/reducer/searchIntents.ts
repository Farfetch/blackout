import * as actionTypes from '../actionTypes';
import type { AnyAction } from 'redux';
import type { SearchHash as Hash, SearchIntentsState } from '../types';

export const INITIAL_STATE: Record<Hash, SearchIntentsState> = {};

const searchIntentsReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_INTENTS_REQUEST:
      return {
        ...state,
        [action.meta.hash]: {
          result: null,
          isLoading: true,
          error: null,
          query: action.meta.query,
        },
      };
    case actionTypes.FETCH_SEARCH_INTENTS_FAILURE:
      return {
        ...state,
        [action.meta.hash]: {
          result: null,
          isLoading: false,
          error: action.payload.error,
          query: action.meta.query,
        },
      };
    case actionTypes.FETCH_SEARCH_INTENTS_SUCCESS:
      return {
        ...state,
        [action.meta.hash]: {
          result: action.payload.result,
          isLoading: false,
          error: false,
          query: action.meta.query,
        },
      };
    case actionTypes.RESET_SEARCH_INTENTS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default searchIntentsReducer;
