import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type {
  BrandsState,
  FetchBrandAction,
  FetchBrandFailureAction,
  FetchBrandRequestAction,
  FetchBrandsAction,
  FetchBrandsFailureAction,
  FetchBrandsRequestAction,
  FetchBrandsSuccessAction,
  ResetBrandsStateAction,
  SetBrandsHashAction,
} from './types';
import type { ReducerSwitch } from '../types';

export const INITIAL_STATE: BrandsState = {
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

export const getError = (state: BrandsState): BrandsState['error'] =>
  state.error;
export const getHash = (state: BrandsState): BrandsState['hash'] => state.hash;
export const getIsLoading = (state: BrandsState): BrandsState['isLoading'] =>
  state.isLoading;
export const getResult = (state: BrandsState): BrandsState['result'] =>
  state.result;

const reducers = combineReducers({
  error,
  hash,
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

const brandsReducer: ReducerSwitch<
  BrandsState,
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
