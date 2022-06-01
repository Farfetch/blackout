import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers, Reducer } from 'redux';
import type { Category } from '@farfetch/blackout-client/categories/types';
import type {
  FetchCategoriesAction,
  FetchTopCategoriesAction,
  State,
  TopCategoryState,
} from '../types';

export const INITIAL_STATE: TopCategoryState = {
  error: null,
  isLoading: false,
  result: null,
};

const error = (
  state = INITIAL_STATE.error,
  action: FetchCategoriesAction | FetchTopCategoriesAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_TOP_CATEGORIES_REQUEST:
      return INITIAL_STATE.error;
    case actionTypes.FETCH_TOP_CATEGORIES_FAILURE:
      return action.payload.error;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: FetchTopCategoriesAction,
) => {
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

const result = (
  state = INITIAL_STATE.result,
  action: FetchCategoriesAction | FetchTopCategoriesAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_TOP_CATEGORIES_SUCCESS:
      return action.payload.result;
    case actionTypes.FETCH_CATEGORIES_SUCCESS: {
      const allCategories: Category[] = Object.values(
        action.payload.entities.categories,
      );

      return allCategories.reduce(
        (
          topIds: number[],
          { id, parentId = null }: { id: number; parentId: number | null },
        ) => {
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

export const getError = (state: State): TopCategoryState['error'] =>
  state.top.error;
export const getIsLoading = (state: State): TopCategoryState['isLoading'] =>
  state.top.isLoading;
export const getResult = (state: State): TopCategoryState['result'] =>
  state.top.result;

const topReducer: Reducer<
  TopCategoryState,
  FetchCategoriesAction | FetchTopCategoriesAction | AnyAction
> = combineReducers({
  error,
  isLoading,
  result,
});

export default topReducer;
