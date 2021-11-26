/**
 * @module categories/reducer
 * @category Categories
 * @subcategory Reducer
 */
import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers } from 'redux';
import topCategoryReducer, {
  INITIAL_STATE as TOP_CATEGORIES_INITIAL_STATE,
} from './topCategories';
import type { Error } from '@farfetch/blackout-client/types';
import type {
  FetchCategoriesAction,
  ResetCategoriesStateAction,
  State,
} from '../types';

export const INITIAL_STATE: State = {
  error: null,
  isFetched: false,
  isLoading: false,
  top: TOP_CATEGORIES_INITIAL_STATE,
};

const error = (
  state: Error | null = INITIAL_STATE.error,
  action: FetchCategoriesAction,
): Error | null => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES_REQUEST:
      return INITIAL_STATE.error;
    case actionTypes.FETCH_CATEGORIES_FAILURE:
      return action.payload.error;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: FetchCategoriesAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES_REQUEST:
      return true;
    case actionTypes.FETCH_CATEGORIES_SUCCESS:
    case actionTypes.FETCH_CATEGORIES_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const isFetched = (
  state = INITIAL_STATE.isFetched,
  action: FetchCategoriesAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES_SUCCESS: {
      return true;
    }
    case actionTypes.FETCH_CATEGORIES_REQUEST:
    case actionTypes.FETCH_CATEGORIES_FAILURE:
      return INITIAL_STATE.isFetched;
    default:
      return state;
  }
};

export const getError = (state: State): State['error'] => state.error;
export const getIsFetched = (state: State): State['isFetched'] =>
  state.isFetched;
export const getIsLoading = (state: State): State['isLoading'] =>
  state.isLoading;

const reducers = combineReducers({
  error,
  isFetched,
  isLoading,
  top: topCategoryReducer,
});

/**
 * Reducer for categories state.
 *
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
const categoriesReducer = (
  state: State,
  action: FetchCategoriesAction | ResetCategoriesStateAction | AnyAction,
): State => {
  if (action.type === actionTypes.RESET_CATEGORIES_STATE) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};

export default categoriesReducer;
