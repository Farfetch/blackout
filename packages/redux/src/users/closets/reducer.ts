import * as actionTypes from './actionTypes.js';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import { createReducerWithResult } from '../../helpers/reducerFactory.js';
import type * as T from './types/index.js';

export const INITIAL_STATE: T.UserClosetsState = {
  result: null,
  error: null,
  isLoading: false,
  closetItems: {
    result: null,
    error: null,
    isLoading: false,
  },
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: AnyAction,
): T.UserClosetsState['isLoading'] => {
  switch (action.type) {
    case actionTypes.FETCH_USER_CLOSETS_REQUEST:
      return true;
    case actionTypes.FETCH_USER_CLOSETS_FAILURE:
    case actionTypes.FETCH_USER_CLOSETS_SUCCESS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const error = (
  state = INITIAL_STATE.error,
  action: AnyAction,
): T.UserClosetsState['error'] => {
  switch (action.type) {
    case actionTypes.FETCH_USER_CLOSETS_REQUEST:
      return INITIAL_STATE.error;
    case actionTypes.FETCH_USER_CLOSETS_FAILURE:
      return (action as T.FetchUserClosetsFailureAction).payload.error;
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  action: AnyAction,
): T.UserClosetsState['result'] => {
  switch (action.type) {
    case actionTypes.FETCH_USER_CLOSETS_SUCCESS:
      return (action as T.FetchUserClosetsSuccessAction).payload;
    default:
      return state;
  }
};

export const closetItems = createReducerWithResult(
  ['FETCH_USER_CLOSET_ITEMS', 'REMOVE_USER_CLOSET_ITEM'],
  INITIAL_STATE.closetItems,
  actionTypes,
  false,
  false,
  actionTypes.RESET_USER_CLOSET_ITEMS_STATE,
);

export const getError = (state: T.UserClosetsState) => state.error;
export const getIsLoading = (state: T.UserClosetsState) => state.isLoading;
export const getResult = (state: T.UserClosetsState) => state.result;
export const getUserClosetItems = (state: T.UserClosetsState) =>
  state.closetItems;

const reducer = combineReducers({
  isLoading,
  result,
  error,
  closetItems,
});

/**
 * Reducer for user closets state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const closetsReducer: Reducer<T.UserClosetsState> = (state, action) => {
  if (action.type === actionTypes.RESET_USER_CLOSETS) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default closetsReducer;
