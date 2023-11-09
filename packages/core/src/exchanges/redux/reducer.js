/**
 * @module exchanges/reducer
 * @category Exchanges
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { createReducerWithResult } from '../../helpers/redux';
import { LOGOUT_SUCCESS } from '../../authentication/redux/actionTypes';

const INITIAL_STATE = {
  error: null,
  isLoading: false,
  result: null,
  exchangeFilters: {
    error: {},
    isLoading: {},
  },
  exchangeBookRequests: {
    result: null,
    error: null,
    isLoading: false,
  },
};

const error = (state = INITIAL_STATE.error, action = {}) => {
  switch (action.type) {
    case actionTypes.CREATE_EXCHANGE_FAILURE:
    case actionTypes.GET_EXCHANGE_FAILURE:
      return action.payload.error;
    case actionTypes.CREATE_EXCHANGE_REQUEST:
    case actionTypes.GET_EXCHANGE_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action = {}) => {
  switch (action.type) {
    case actionTypes.CREATE_EXCHANGE_REQUEST:
    case actionTypes.GET_EXCHANGE_REQUEST:
      return true;
    case actionTypes.CREATE_EXCHANGE_SUCCESS:
    case actionTypes.CREATE_EXCHANGE_FAILURE:
    case actionTypes.GET_EXCHANGE_SUCCESS:
    case actionTypes.GET_EXCHANGE_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const result = (state = INITIAL_STATE.result, action = {}) => {
  switch (action.type) {
    case actionTypes.CREATE_EXCHANGE_SUCCESS:
    case actionTypes.GET_EXCHANGE_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export const exchangeFilters = (
  state = INITIAL_STATE.exchangeFilters,
  action = {},
) => {
  switch (action.type) {
    case actionTypes.CREATE_EXCHANGE_FILTER_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.orderItemUuid]: true,
        },
        error: {
          ...state.error,
          [action.meta.orderItemUuid]: null,
        },
      };
    case actionTypes.CREATE_EXCHANGE_FILTER_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.orderItemUuid]: false,
        },
      };
    case actionTypes.CREATE_EXCHANGE_FILTER_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.orderItemUuid]: false,
        },
        error: {
          ...state.error,
          [action.meta.orderItemUuid]: action.payload.error,
        },
      };
    case actionTypes.RESET_EXCHANGE_FILTERS_STATE:
      return INITIAL_STATE.exchangeFilters;
    default:
      return state;
  }
};

export const exchangeBookRequests = createReducerWithResult(
  ['GET_EXCHANGE_BOOK_REQUEST', 'CREATE_EXCHANGE_BOOK_REQUEST'],
  INITIAL_STATE.exchangeBookRequests,
  actionTypes,
);

const resetExchangeFiltersEntities = state => {
  if (!state) {
    return state;
  }

  const { exchangeFilters, ...rest } = state;

  return rest;
};

export const entitiesMapper = {
  [actionTypes.RESET_EXCHANGE_FILTERS_ENTITIES]: resetExchangeFiltersEntities,
  [LOGOUT_SUCCESS]: resetExchangeFiltersEntities,
};

export const getError = state => state.error;
export const getIsLoading = state => state.isLoading;
export const getResult = state => state.result;
export const getExchangeFilters = state => state.exchangeFilters;
export const getExchangeBookRequests = state => state.exchangeBookRequests;

const reducer = combineReducers({
  error,
  isLoading,
  result,
  exchangeFilters,
  exchangeBookRequests,
});

/**
 * Reducer for exchanges state.
 *
 * @function exchangesReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default (state, action = {}) => {
  if (action.type === actionTypes.RESET_EXCHANGES) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};
