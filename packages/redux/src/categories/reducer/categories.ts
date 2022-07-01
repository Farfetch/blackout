import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers } from 'redux';
import topCategoryReducer, {
  INITIAL_STATE as TOP_CATEGORIES_INITIAL_STATE,
} from './topCategories';
import type { BlackoutError } from '@farfetch/blackout-client';
import type {
  CategoriesState,
  FetchCategoriesAction,
  ResetCategoriesStateAction,
} from '../types';

export const INITIAL_STATE: CategoriesState = {
  error: null,
  isFetched: false,
  isLoading: false,
  top: TOP_CATEGORIES_INITIAL_STATE,
};

const error = (
  state: BlackoutError | null = INITIAL_STATE.error,
  action: FetchCategoriesAction,
): BlackoutError | null => {
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

export const getError = (state: CategoriesState): CategoriesState['error'] =>
  state.error;
export const getIsFetched = (
  state: CategoriesState,
): CategoriesState['isFetched'] => state.isFetched;
export const getIsLoading = (
  state: CategoriesState,
): CategoriesState['isLoading'] => state.isLoading;

const reducers = combineReducers({
  error,
  isFetched,
  isLoading,
  top: topCategoryReducer,
});

/**
 * Reducer for categories state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const categoriesReducer = (
  state: CategoriesState,
  action: FetchCategoriesAction | ResetCategoriesStateAction | AnyAction,
): CategoriesState => {
  if (action.type === actionTypes.RESET_CATEGORIES_STATE) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};

export default categoriesReducer;
