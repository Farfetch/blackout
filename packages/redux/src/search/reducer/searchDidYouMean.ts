import * as actionTypes from '../actionTypes';
import { combineReducers } from 'redux';
import type {
  FetchSearchDidYouMeanAction,
  FetchSearchDidYouMeanFailureAction,
  FetchSearchDidYouMeanRequestAction,
  FetchSearchDidYouMeanSuccessAction,
  ResetSearchDidYouMeanAction,
  SearchDidYouMeanState,
} from '../types';

export const INITIAL_STATE: SearchDidYouMeanState = {
  error: null,
  isLoading: false,
  query: null,
  result: null,
};

const error = (
  state = INITIAL_STATE.error,
  action:
    | FetchSearchDidYouMeanRequestAction
    | FetchSearchDidYouMeanFailureAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_DID_YOU_MEAN_REQUEST:
      return INITIAL_STATE.error;
    case actionTypes.FETCH_SEARCH_DID_YOU_MEAN_FAILURE:
      return action.payload.error;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: FetchSearchDidYouMeanAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_DID_YOU_MEAN_REQUEST:
      return true;
    case actionTypes.FETCH_SEARCH_DID_YOU_MEAN_SUCCESS:
    case actionTypes.FETCH_SEARCH_DID_YOU_MEAN_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const query = (
  state = INITIAL_STATE.query,
  action: FetchSearchDidYouMeanRequestAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_DID_YOU_MEAN_REQUEST:
      return action.meta.query;
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  action: FetchSearchDidYouMeanSuccessAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_DID_YOU_MEAN_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

export const getError = (
  state: SearchDidYouMeanState,
): SearchDidYouMeanState['error'] => state.error;
export const getIsLoading = (
  state: SearchDidYouMeanState,
): SearchDidYouMeanState['isLoading'] => state.isLoading;
export const getQuery = (
  state: SearchDidYouMeanState,
): SearchDidYouMeanState['query'] => state.query;
export const getResult = (
  state: SearchDidYouMeanState,
): SearchDidYouMeanState['result'] => state.result;

const reducer = combineReducers({
  error,
  isLoading,
  query,
  result,
});

/**
 * Reducer for search did you mean state.
 *
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
const searchDidYouMeanReducer = (
  state: SearchDidYouMeanState,
  action: FetchSearchDidYouMeanAction | ResetSearchDidYouMeanAction,
): SearchDidYouMeanState => {
  if (action.type === actionTypes.RESET_SEARCH_DID_YOU_MEAN) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default searchDidYouMeanReducer;
