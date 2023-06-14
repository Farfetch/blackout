import * as actionTypes from './actionTypes.js';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import { createReducerWithResult } from '../helpers/reducerFactory.js';
import { LOGOUT_SUCCESS } from '../users/authentication/actionTypes.js';
import type * as T from './types/index.js';

export const INITIAL_STATE: T.ExchangesState = {
  error: null,
  isLoading: false,
  result: null,
  exchangeFilter: {
    result: null,
    error: null,
    isLoading: false,
  },
  exchangeBookRequest: {
    result: null,
    error: null,
    isLoading: false,
  },
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.CREATE_EXCHANGE_FAILURE:
    case actionTypes.FETCH_EXCHANGE_FAILURE:
      return action.payload.error;
    case actionTypes.CREATE_EXCHANGE_REQUEST:
    case actionTypes.FETCH_EXCHANGE_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.CREATE_EXCHANGE_REQUEST:
    case actionTypes.FETCH_EXCHANGE_REQUEST:
      return true;
    case actionTypes.CREATE_EXCHANGE_SUCCESS:
    case actionTypes.CREATE_EXCHANGE_FAILURE:
    case actionTypes.FETCH_EXCHANGE_SUCCESS:
    case actionTypes.FETCH_EXCHANGE_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const result = (state = INITIAL_STATE.result, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.CREATE_EXCHANGE_SUCCESS:
    case actionTypes.FETCH_EXCHANGE_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export const exchangeFilter = createReducerWithResult(
  'CREATE_EXCHANGE_FILTER',
  INITIAL_STATE.exchangeFilter,
  actionTypes,
  false,
  false,
  actionTypes.RESET_EXCHANGE_FILTER_STATE,
);

export const exchangeBookRequest = createReducerWithResult(
  ['FETCH_EXCHANGE_BOOK_REQUEST', 'CREATE_EXCHANGE_BOOK_REQUEST'],
  INITIAL_STATE.exchangeBookRequest,
  actionTypes,
  false,
  false,
  actionTypes.RESET_EXCHANGE_BOOK_REQUEST_STATE,
);

export const getError = (state: T.ExchangesState) => state.error;
export const getIsLoading = (state: T.ExchangesState) => state.isLoading;
export const getResult = (state: T.ExchangesState) => state.result;
export const getExchangeFilter = (state: T.ExchangesState) =>
  state.exchangeFilter;
export const getExchangeBookRequest = (state: T.ExchangesState) =>
  state.exchangeBookRequest;

/**
 * Reducer for exchanges state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const reducer: Reducer<T.ExchangesState> = combineReducers({
  error,
  isLoading,
  result,
  exchangeFilter,
  exchangeBookRequest,
});

const exchangesReducer: Reducer<T.ExchangesState> = (state, action) => {
  if (
    action.type === LOGOUT_SUCCESS ||
    action.type === actionTypes.RESET_EXCHANGES
  ) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default exchangesReducer;
