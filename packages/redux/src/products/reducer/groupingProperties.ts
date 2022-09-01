import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type {
  FetchProductGroupingPropertiesAction,
  FetchProductGroupingPropertiesFailureAction,
  FetchProductGroupingPropertiesRequestAction,
  ProductsGroupingPropertiesState,
} from '../types';

export const INITIAL_STATE: ProductsGroupingPropertiesState = {
  error: {},
  isLoading: {},
};

const error = (
  state = INITIAL_STATE.error,
  action:
    | FetchProductGroupingPropertiesRequestAction
    | FetchProductGroupingPropertiesFailureAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES_REQUEST:
      return {
        ...state,
        [action.meta.productId]: undefined,
      };
    case actionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES_FAILURE:
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
  action: FetchProductGroupingPropertiesAction | AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES_REQUEST:
      return {
        ...state,
        [action.meta.productId]: true,
      };
    case actionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES_SUCCESS:
      return { ...state, [action.meta.productId]: false };
    case actionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES_FAILURE:
      return { ...state, [action.meta.productId]: undefined };
    default:
      return state;
  }
};

export const getError = (
  state: ProductsGroupingPropertiesState,
): ProductsGroupingPropertiesState['error'] => state.error;
export const getIsLoading = (
  state: ProductsGroupingPropertiesState,
): ProductsGroupingPropertiesState['isLoading'] => state.isLoading;

/**
 * Reducer for products grouping properties.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const productsGroupingPropertiesReducer = combineReducers({
  error,
  isLoading,
});

export default productsGroupingPropertiesReducer;
