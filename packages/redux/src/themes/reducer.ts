import * as actionTypes from './actionTypes.js';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import type { ThemeState } from './types/index.js';

export const INITIAL_STATE: ThemeState = {
  error: {},
  isLoading: {},
  result: {},
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_THEME_REQUEST:
    case actionTypes.FETCH_THEME_SUCCESS:
      return {
        ...state,
        [action.meta.code]: undefined,
      };
    case actionTypes.FETCH_THEME_FAILURE:
      return {
        ...state,
        [action.meta.code]: action.payload.error,
      };
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_THEME_REQUEST:
      return {
        ...state,
        [action.meta.code]: true,
      };
    case actionTypes.FETCH_THEME_FAILURE:
    case actionTypes.FETCH_THEME_SUCCESS:
      return {
        ...state,
        [action.meta.code]: false,
      };
    default:
      return state;
  }
};

const result = (state = INITIAL_STATE.result, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_THEME_REQUEST:
    case actionTypes.FETCH_THEME_FAILURE:
      return {
        ...state,
        [action.meta.code]: undefined,
      };
    case actionTypes.FETCH_THEME_SUCCESS:
      return {
        ...state,
        [action.meta.code]: action.payload.result,
      };
    default:
      return state;
  }
};

export const getError = (state: ThemeState): ThemeState['error'] => state.error;
export const getIsLoading = (state: ThemeState): ThemeState['isLoading'] =>
  state.isLoading;
export const getResult = (state: ThemeState): ThemeState['result'] =>
  state.result;

/**
 * Reducer for styleguide theme.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const ThemeReducer: Reducer<ThemeState> = combineReducers({
  error,
  isLoading,
  result,
});

export default ThemeReducer;
