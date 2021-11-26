/**
 * @module products/reducer
 * @category Products color grouping
 * @subcategory Reducer
 */
import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type {
  FetchProductColorGroupingAction,
  FetchProductColorGroupingFailureAction,
  FetchProductColorGroupingRequestAction,
  ProductsColorGroupingState,
} from '../types';

export const INITIAL_STATE: ProductsColorGroupingState = {
  error: {},
  isLoading: {},
};

const error = (
  state = INITIAL_STATE.error,
  action:
    | FetchProductColorGroupingRequestAction
    | FetchProductColorGroupingFailureAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_COLOR_GROUPING_REQUEST:
      return {
        ...state,
        [action.meta.productId]: undefined,
      };
    case actionTypes.FETCH_PRODUCT_COLOR_GROUPING_FAILURE:
      return {
        ...state,
        [action.meta.productId]: action.payload.error,
      };
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: FetchProductColorGroupingAction | AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_COLOR_GROUPING_REQUEST:
      return {
        ...state,
        [action.meta.productId]: true,
      };
    case actionTypes.FETCH_PRODUCT_COLOR_GROUPING_SUCCESS:
      return { ...state, [action.meta.productId]: false };
    case actionTypes.FETCH_PRODUCT_COLOR_GROUPING_FAILURE:
      return { ...state, [action.meta.productId]: undefined };
    default:
      return state;
  }
};

export const getError = (
  state: ProductsColorGroupingState,
): ProductsColorGroupingState['error'] => state.error;
export const getIsLoading = (
  state: ProductsColorGroupingState,
): ProductsColorGroupingState['isLoading'] => state.isLoading;

/**
 * Reducer for products color grouping.
 *
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
const productsColorGroupingReducer = combineReducers({
  error,
  isLoading,
});

export default productsColorGroupingReducer;
