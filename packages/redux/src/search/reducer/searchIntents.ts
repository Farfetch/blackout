import * as actionTypes from '../actionTypes';
import { combineReducers } from 'redux';
import type {
  FetchSearchIntentsAction,
  ResetSearchIntentsAction,
  SearchIntentsState,
} from '../types';

export const INITIAL_STATE: SearchIntentsState = {
  error: null,
  isLoading: false,
  result: null,
};

const error = (
  state = INITIAL_STATE.error,
  action: FetchSearchIntentsAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_INTENTS_REQUEST:
      return INITIAL_STATE.error;
    case actionTypes.FETCH_SEARCH_INTENTS_FAILURE:
      return action.payload.error;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: FetchSearchIntentsAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_INTENTS_REQUEST:
      return true;
    case actionTypes.FETCH_SEARCH_INTENTS_SUCCESS:
      return INITIAL_STATE.isLoading;
    case actionTypes.FETCH_SEARCH_INTENTS_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  action: FetchSearchIntentsAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_INTENTS_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

export const getError = (
  state: SearchIntentsState,
): SearchIntentsState['error'] => state.error;
export const getIsLoading = (
  state: SearchIntentsState,
): SearchIntentsState['isLoading'] => state.isLoading;
export const getResult = (
  state: SearchIntentsState,
): SearchIntentsState['result'] => state.result;

const reducer = combineReducers({
  error,
  isLoading,
  result,
});

/**
 * Reducer for search intents state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const searchIntentsReducer = (
  state: SearchIntentsState,
  action: FetchSearchIntentsAction | ResetSearchIntentsAction,
): SearchIntentsState => {
  if (action.type === actionTypes.RESET_SEARCH_INTENTS) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default searchIntentsReducer;
