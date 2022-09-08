import * as actionTypes from '../actionTypes';
import type { AnyAction } from 'redux';
import type { SearchHash as Hash, SearchDidYouMeanState } from '../types';

export const INITIAL_STATE: Record<Hash, SearchDidYouMeanState> = {};

const searchDidYouMeanReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_DID_YOU_MEAN_REQUEST:
      return {
        ...state,
        [action.meta.hash]: {
          result: null,
          isLoading: true,
          error: null,
          query: action.meta.query,
        },
      };
    case actionTypes.FETCH_SEARCH_DID_YOU_MEAN_FAILURE:
      return {
        ...state,
        [action.meta.hash]: {
          result: null,
          isLoading: false,
          error: action.payload.error,
          query: action.meta.query,
        },
      };
    case actionTypes.FETCH_SEARCH_DID_YOU_MEAN_SUCCESS:
      return {
        ...state,
        [action.meta.hash]: {
          result: action.payload.result,
          isLoading: false,
          error: false,
          query: action.meta.query,
        },
      };
    case actionTypes.RESET_SEARCH_DID_YOU_MEAN:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default searchDidYouMeanReducer;
