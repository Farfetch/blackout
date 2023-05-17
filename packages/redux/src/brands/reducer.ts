import * as actionTypes from './actionTypes.js';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import type { BrandsState } from './types/index.js';

export const INITIAL_STATE: BrandsState = {
  error: {},
  isLoading: {},
  result: {},
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_BRAND_REQUEST:
      return {
        ...state,
        [action.meta.brandId]: undefined,
      };
    case actionTypes.FETCH_BRANDS_REQUEST:
      return {
        ...state,
        [action.meta.hash]: undefined,
      };
    case actionTypes.FETCH_BRAND_FAILURE:
      return {
        ...state,
        [action.meta.brandId]: action.payload.error,
      };
    case actionTypes.FETCH_BRANDS_FAILURE:
      return {
        ...state,
        [action.meta.hash]: action.payload.error,
      };
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_BRAND_REQUEST:
      return {
        ...state,
        [action.meta.brandId]: true,
      };
    case actionTypes.FETCH_BRANDS_REQUEST:
      return {
        ...state,
        [action.meta.hash]: true,
      };
    case actionTypes.FETCH_BRAND_SUCCESS:
    case actionTypes.FETCH_BRAND_FAILURE:
      return {
        ...state,
        [action.meta.brandId]: false,
      };
    case actionTypes.FETCH_BRANDS_SUCCESS:
    case actionTypes.FETCH_BRANDS_FAILURE:
      return {
        ...state,
        [action.meta.hash]: false,
      };
    default:
      return state;
  }
};

const result = (state = INITIAL_STATE.result, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_BRANDS_SUCCESS:
      return {
        ...state,
        [action.meta.hash]: action.payload.result,
      };
    default:
      return state;
  }
};

export const getError = (state: BrandsState): BrandsState['error'] =>
  state.error;
export const getIsLoading = (state: BrandsState): BrandsState['isLoading'] =>
  state.isLoading;
export const getResult = (state: BrandsState): BrandsState['result'] =>
  state.result;

const reducers = combineReducers({
  error,
  isLoading,
  result,
});

/**
 * Reducer for brands state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */

const brandsReducer: Reducer<BrandsState> = (state, action) => {
  if (action.type === actionTypes.RESET_BRANDS_STATE) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};

export default brandsReducer;
