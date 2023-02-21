import * as actionTypes from './actionTypes';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import isEmpty from 'lodash/isEmpty';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { SizeScalesState } from './types';

export const INITIAL_STATE: SizeScalesState = {
  error: null,
  isLoading: false,
  sizeScale: {
    error: {},
    isLoading: {},
  },
};

const error = (
  state: BlackoutError | null = INITIAL_STATE.error,
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_SIZE_SCALES_REQUEST:
      if (isEmpty(action.meta.query)) {
        return INITIAL_STATE.error;
      }

      return state;
    case actionTypes.FETCH_SIZE_SCALES_FAILURE:
      if (isEmpty(action.meta.query)) {
        return action.payload.error;
      }

      return state;
    default:
      return state;
  }
};

const isLoading = (
  state: boolean = INITIAL_STATE.isLoading,
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_SIZE_SCALES_REQUEST:
      if (isEmpty(action.meta.query)) {
        return true;
      }

      return state;
    case actionTypes.FETCH_SIZE_SCALES_SUCCESS:
    case actionTypes.FETCH_SIZE_SCALES_FAILURE:
      if (isEmpty(action.meta.query)) {
        return INITIAL_STATE.isLoading;
      }

      return state;
    default:
      return state;
  }
};

const sizeScale = (
  state: SizeScalesState['sizeScale'] = INITIAL_STATE.sizeScale,
  action: AnyAction,
): SizeScalesState['sizeScale'] => {
  switch (action.type) {
    case actionTypes.FETCH_SIZE_SCALE_REQUEST:
      return {
        error: {
          ...state.error,
          [action.meta.sizeScaleId]: undefined,
        },
        isLoading: {
          ...state.isLoading,
          [action.meta.sizeScaleId]: true,
        },
      };
    case actionTypes.FETCH_SIZE_SCALES_REQUEST:
      if (isEmpty(action.meta.query)) {
        return state;
      }

      return {
        error: {
          ...state.error,
          [`categoryId_${action.meta.query.categoryId}`]: undefined,
        },
        isLoading: {
          ...state.isLoading,
          [`categoryId_${action.meta.query.categoryId}`]: true,
        },
      };
    case actionTypes.FETCH_SIZE_SCALE_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.sizeScaleId]: false,
        },
      };
    case actionTypes.FETCH_SIZE_SCALES_SUCCESS:
      if (isEmpty(action.meta.query)) {
        return state;
      }

      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [`categoryId_${action.meta.query.categoryId}`]: false,
        },
      };
    case actionTypes.FETCH_SIZE_SCALE_FAILURE:
      return {
        error: {
          ...state.error,
          [action.meta.sizeScaleId]: action.payload.error,
        },
        isLoading: {
          ...state.isLoading,
          [action.meta.sizeScaleId]: undefined,
        },
      };
    case actionTypes.FETCH_SIZE_SCALES_FAILURE:
      if (isEmpty(action.meta.query)) {
        return state;
      }

      return {
        error: {
          ...state.error,
          [`categoryId_${action.meta.query.categoryId}`]: action.payload.error,
        },
        isLoading: {
          ...state.isLoading,
          [`categoryId_${action.meta.query.categoryId}`]: undefined,
        },
      };
    default:
      return state;
  }
};

export const getError = (state: SizeScalesState): SizeScalesState['error'] =>
  state.error;
export const getIsLoading = (
  state: SizeScalesState,
): SizeScalesState['isLoading'] => state.isLoading;
export const getSizeScaleError = (
  state: SizeScalesState,
): SizeScalesState['sizeScale']['error'] => state.sizeScale.error;
export const getSizeScaleIsLoading = (
  state: SizeScalesState,
): SizeScalesState['sizeScale']['isLoading'] => state.sizeScale.isLoading;

const reducers = combineReducers({
  error,
  isLoading,
  sizeScale,
});

/**
 * Reducer for sizeScales state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const sizeScalesReducer: Reducer<SizeScalesState> = (state, action) => {
  if (action.type === actionTypes.RESET_SIZE_SCALES_STATE) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};

export default sizeScalesReducer;
