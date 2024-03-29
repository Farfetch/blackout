import * as actionTypes from '../actionTypes.js';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import type { CategoriesState, TopCategoriesState } from '../types/index.js';
import type { Category } from '@farfetch/blackout-client';

export const INITIAL_STATE: TopCategoriesState = {
  error: null,
  isLoading: false,
  result: null,
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_TOP_CATEGORIES_REQUEST:
      return INITIAL_STATE.error;
    case actionTypes.FETCH_TOP_CATEGORIES_FAILURE:
      return action.payload.error;
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_TOP_CATEGORIES_REQUEST:
      return true;
    case actionTypes.FETCH_TOP_CATEGORIES_SUCCESS:
    case actionTypes.FETCH_TOP_CATEGORIES_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const result = (state = INITIAL_STATE.result, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_TOP_CATEGORIES_SUCCESS:
      return action.payload.result;
    case actionTypes.FETCH_CATEGORIES_SUCCESS: {
      const allCategories: Category[] = Object.values(
        action.payload.entities.categories,
      );

      return allCategories.reduce(
        (topIds: number[], { id, parentId }: Category) => {
          if (!parentId) {
            topIds.push(id);
          }

          return topIds;
        },
        [],
      );
    }
    default:
      return state;
  }
};

export const getError = (state: CategoriesState) => state.top.error;
export const getIsLoading = (state: CategoriesState) => state.top.isLoading;
export const getResult = (state: CategoriesState) => state.top.result;

/**
 * Reducer for top categories state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const topReducer: Reducer<TopCategoriesState> = combineReducers({
  error,
  isLoading,
  result,
});

export default topReducer;
