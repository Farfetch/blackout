/**
 * @module brands/reducer
 * @category Brands
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type {
  FetchBrandAction,
  FetchBrandFailureAction,
  FetchBrandRequestAction,
  FetchBrandsAction,
  FetchBrandsFailureAction,
  FetchBrandsRequestAction,
  FetchBrandsSuccessAction,
  ResetBrandsStateAction,
  SetBrandsHashAction,
  State,
} from './types';
import type { ReducerSwitch } from '../types';

export const INITIAL_STATE: State = {
  error: {},
  hash: null,
  isLoading: {},
  result: {},
};

const error = (
  state = INITIAL_STATE.error,
  action:
    | FetchBrandRequestAction
    | FetchBrandsRequestAction
    | FetchBrandFailureAction
    | FetchBrandsFailureAction,
) => {
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

const hash = (state = INITIAL_STATE.hash, action: SetBrandsHashAction) => {
  if (action.type === actionTypes.SET_BRANDS_HASH) {
    return action.meta.hash;
  }

  return state;
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: FetchBrandAction | FetchBrandsAction,
) => {
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

const result = (
  state = INITIAL_STATE.result,
  action: FetchBrandsSuccessAction | AnyAction,
) => {
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

export const getError = (state: State): State['error'] => state.error;
export const getHash = (state: State): State['hash'] => state.hash;
export const getIsLoading = (state: State): State['isLoading'] =>
  state.isLoading;
export const getResult = (state: State): State['result'] => state.result;

const reducers = combineReducers({
  error,
  hash,
  isLoading,
  result,
});

/**
 * Reducer for brands state.
 *
 * @function brandsReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */

const brandsReducer: ReducerSwitch<
  State,
  | FetchBrandAction
  | FetchBrandsAction
  | ResetBrandsStateAction
  | SetBrandsHashAction
> = (state, action) => {
  if (action.type === actionTypes.RESET_BRANDS_STATE) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};

export default brandsReducer;
