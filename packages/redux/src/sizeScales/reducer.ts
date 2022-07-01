import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import isEmpty from 'lodash/isEmpty';
import type { BlackoutError } from '@farfetch/blackout-client';
import type {
  FetchSizeScaleAction,
  FetchSizeScaleMappingsAction,
  FetchSizeScalesAction,
  ResetSizeScalesStateAction,
  SizeScalesState,
} from './types';
import type { ReducerSwitch } from '../types';

export const INITIAL_STATE: SizeScalesState = {
  error: null,
  isLoading: false,
  sizeScale: {
    error: {},
    isLoading: {},
  },
  mappings: {
    error: {},
    isLoading: {},
    result: {},
  },
};

const error = (
  state: BlackoutError | null = INITIAL_STATE.error,
  action: FetchSizeScalesAction,
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
  action: FetchSizeScalesAction | AnyAction,
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
  action: FetchSizeScalesAction | FetchSizeScaleAction,
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

const mappings = (
  state: SizeScalesState['mappings'] = INITIAL_STATE.mappings,
  action: FetchSizeScaleMappingsAction,
): SizeScalesState['mappings'] => {
  switch (action.type) {
    case actionTypes.FETCH_SIZESCALE_MAPPINGS_REQUEST:
      return {
        ...state,
        error: {
          ...state.error,
          [action.meta.hash]: undefined,
        },
        isLoading: {
          ...state.isLoading,
          [action.meta.hash]: true,
        },
      };
    case actionTypes.FETCH_SIZESCALE_MAPPINGS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.hash]: false,
        },
        result: {
          ...state.result,
          [action.meta.hash]: action.payload.result,
        },
      };
    case actionTypes.FETCH_SIZESCALE_MAPPINGS_FAILURE:
      return {
        ...state,
        error: {
          ...state.error,
          [action.meta.hash]: action.payload.error,
        },
        isLoading: {
          ...state.isLoading,
          [action.meta.hash]: false,
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
export const getMappingError = (
  state: SizeScalesState,
): SizeScalesState['mappings']['error'] => state.mappings.error;
export const getMappingIsLoading = (
  state: SizeScalesState,
): SizeScalesState['mappings']['isLoading'] => state.mappings.isLoading;
export const getMappingResult = (
  state: SizeScalesState,
): SizeScalesState['mappings']['result'] => state.mappings.result;

const reducers = combineReducers({
  error,
  isLoading,
  sizeScale,
  mappings,
});

/**
 * Reducer for sizeScales state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const sizeScalesReducer: ReducerSwitch<
  SizeScalesState,
  | FetchSizeScaleAction
  | FetchSizeScalesAction
  | FetchSizeScaleMappingsAction
  | ResetSizeScalesStateAction
> = (state, action) => {
  if (action.type === actionTypes.RESET_SIZE_SCALES_STATE) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};

export default sizeScalesReducer;
