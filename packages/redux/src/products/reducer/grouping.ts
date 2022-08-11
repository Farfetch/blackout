import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type { ProductsGroupingState } from '../types';

export const INITIAL_STATE: ProductsGroupingState = {
  error: {},
  isLoading: {},
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_GROUPING_REQUEST:
      return {
        ...state,
        [action.meta.productId]: undefined,
      };
    case actionTypes.FETCH_PRODUCT_GROUPING_FAILURE:
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
    case actionTypes.FETCH_PRODUCT_GROUPING_REQUEST:
      return {
        ...state,
        [action.meta.productId]: true,
      };
    case actionTypes.FETCH_PRODUCT_GROUPING_SUCCESS:
      return { ...state, [action.meta.productId]: false };
    case actionTypes.FETCH_PRODUCT_GROUPING_FAILURE:
      return { ...state, [action.meta.productId]: undefined };
    default:
      return state;
  }
};

export const getError = (
  state: ProductsGroupingState,
): ProductsGroupingState['error'] => state.error;
export const getIsLoading = (
  state: ProductsGroupingState,
): ProductsGroupingState['isLoading'] => state.isLoading;

/**
 * Reducer for products grouping.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const productsGroupingReducer = combineReducers({
  error,
  isLoading,
});

export default productsGroupingReducer;
