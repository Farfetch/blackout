import * as actionTypes from '../actionTypes/index.js';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import type {
  FetchProductGroupingPropertiesAction,
  FetchProductGroupingPropertiesFailureAction,
  FetchProductGroupingPropertiesRequestAction,
  ProductsGroupingPropertiesState,
} from '../types/index.js';

export const INITIAL_STATE: ProductsGroupingPropertiesState = {
  error: {},
  isLoading: {},
  results: {},
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
        [action.meta.productId]: {
          ...state[action.meta.productId],
          [action.payload.hash]: undefined,
        },
      };
    case actionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES_FAILURE:
      return {
        ...state,
        [action.meta.productId]: {
          ...state[action.meta.productId],
          [action.payload.hash]: action.payload.error,
        },
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
        [action.meta.productId]: {
          ...state[action.meta.productId],
          [action.payload.hash]: true,
        },
      };
    case actionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES_SUCCESS:
      return {
        ...state,
        [action.meta.productId]: {
          ...state[action.meta.productId],
          [action.payload.hash]: false,
        },
      };
    case actionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES_FAILURE:
      return {
        ...state,
        [action.meta.productId]: {
          ...state[action.meta.productId],
          [action.payload.hash]: false,
        },
      };
    default:
      return state;
  }
};

const results = (
  state = INITIAL_STATE.results,
  action: FetchProductGroupingPropertiesAction | AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES_SUCCESS:
      return {
        ...state,
        [action.meta.productId]: {
          ...state[action.meta.productId],
          [action.payload.hash]: action.payload.result,
        },
      };

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
const productsGroupingPropertiesReducer: Reducer<ProductsGroupingPropertiesState> =
  combineReducers({
    error,
    isLoading,
    results,
  });

export default productsGroupingPropertiesReducer;
