import * as actionTypes from '../actionTypes/index.js';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import type { ProductsAttributesState } from '../types/index.js';

export const INITIAL_STATE: ProductsAttributesState = {
  error: {},
  isLoading: {},
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_ATTRIBUTES_REQUEST:
      return {
        ...state,
        [action.meta.productId]: undefined,
      };
    case actionTypes.FETCH_PRODUCT_ATTRIBUTES_FAILURE:
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
    case actionTypes.FETCH_PRODUCT_ATTRIBUTES_REQUEST:
      return {
        ...state,
        [action.meta.productId]: true,
      };
    case actionTypes.FETCH_PRODUCT_ATTRIBUTES_SUCCESS:
    case actionTypes.FETCH_PRODUCT_ATTRIBUTES_FAILURE:
      return { ...state, [action.meta.productId]: false };
    default:
      return state;
  }
};

export const getError = (
  state: ProductsAttributesState,
): ProductsAttributesState['error'] => state.error;
export const getIsLoading = (
  state: ProductsAttributesState,
): ProductsAttributesState['isLoading'] => state.isLoading;

/**
 * Reducer for products attributes.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const productsAttributesReducer: Reducer<ProductsAttributesState> =
  combineReducers({
    error,
    isLoading,
  });

export default productsAttributesReducer;
