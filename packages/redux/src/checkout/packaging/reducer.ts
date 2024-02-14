import * as actionTypes from './../actionTypes.js';
import { type AnyAction, combineReducers } from 'redux';
import { createReducerWithResult } from '../../helpers/reducerFactory.js';
import type { PackagingOptionsState } from './index.js';

export const INITIAL_STATE: PackagingOptionsState = {
  error: null,
  result: null,
  isLoading: false,
};

export const packagingOptions = createReducerWithResult(
  'FETCH_PACKAGING_OPTIONS',
  INITIAL_STATE,
  actionTypes,
);

const error = (
  state = INITIAL_STATE.error,
  action: AnyAction,
): PackagingOptionsState['error'] => {
  switch (action.type) {
    case actionTypes.FETCH_PACKAGING_OPTIONS_FAILURE:
      return action.payload.error;
    case actionTypes.FETCH_PACKAGING_OPTIONS_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: AnyAction,
): PackagingOptionsState['isLoading'] => {
  switch (action.type) {
    case actionTypes.FETCH_PACKAGING_OPTIONS_REQUEST:
      return true;
    case actionTypes.FETCH_PACKAGING_OPTIONS_SUCCESS:
    case actionTypes.FETCH_PACKAGING_OPTIONS_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  action: AnyAction,
): PackagingOptionsState['result'] => {
  switch (action.type) {
    case actionTypes.FETCH_PACKAGING_OPTIONS_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

export const getPackagingOptions = (
  state: PackagingOptionsState,
): PackagingOptionsState => state;

const packagingOptionsReducer = combineReducers({
  result,
  error,
  isLoading,
});

export default packagingOptionsReducer;
