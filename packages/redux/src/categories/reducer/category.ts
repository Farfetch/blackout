import * as actionTypes from '../actionTypes.js';
import type { AnyAction, Reducer } from 'redux';
import type { CategoryState } from '../types/index.js';

export const INITIAL_STATE: CategoryState = {
  isLoading: {},
  error: {},
};

const categoryReducer: Reducer<CategoryState> = (
  state = INITIAL_STATE,
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORY_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.id]: true,
        },
        error: {
          ...state.error,
          [action.meta.id]: null,
        },
      };
    case actionTypes.FETCH_CATEGORY_SUCCESS:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.id]: false,
        },
        error: {
          ...state.error,
          [action.meta.id]: null,
        },
      };
    case actionTypes.FETCH_CATEGORY_FAILURE:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.id]: false,
        },
        error: {
          ...state.error,
          [action.meta.id]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

export const getError = (state: CategoryState) => state.error;
export const getIsLoading = (state: CategoryState) => state.isLoading;

export default categoryReducer;
