import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type { ProductsSizesState } from '../types';

export const INITIAL_STATE: ProductsSizesState = {
  error: {},
  isLoading: {},
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_SIZES_REQUEST:
      return {
        ...state,
        [action.meta.productId]: undefined,
      };
    case actionTypes.FETCH_PRODUCT_SIZES_FAILURE:
      return {
        ...state,
        [action.meta.productId]: action.payload.error,
      };
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_SIZES_REQUEST:
      return {
        ...state,
        [action.meta.productId]: true,
      };
    case actionTypes.FETCH_PRODUCT_SIZES_SUCCESS:
    case actionTypes.FETCH_PRODUCT_SIZES_FAILURE:
      return { ...state, [action.meta.productId]: false };
    default:
      return state;
  }
};

export const getError = (
  state: ProductsSizesState,
): ProductsSizesState['error'] => state.error;
export const getIsLoading = (
  state: ProductsSizesState,
): ProductsSizesState['isLoading'] => state.isLoading;

/**
 * Reducer for product sizes.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const productsSizesReducer = combineReducers({
  error,
  isLoading,
});

export default productsSizesReducer;
