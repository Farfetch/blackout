import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers, Reducer } from 'redux';
import type {
  FetchProductGroupingAction,
  FetchProductGroupingFailureAction,
  FetchProductGroupingRequestAction,
  FetchProductGroupingSuccessAction,
  ProductsGroupingState,
} from '../types';

export const INITIAL_STATE: ProductsGroupingState = {
  error: {},
  isLoading: {},
  results: {},
};

const error = (
  state = INITIAL_STATE.error,
  action:
    | FetchProductGroupingRequestAction
    | FetchProductGroupingFailureAction
    | AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_GROUPING_REQUEST:
      return {
        ...state,
        [action.meta.productId]: {
          ...state[action.meta.productId],
          [action.payload.hash]: undefined,
        },
      };
    case actionTypes.FETCH_PRODUCT_GROUPING_FAILURE:
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
  action: FetchProductGroupingAction | AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_GROUPING_REQUEST:
      return {
        ...state,
        [action.meta.productId]: {
          ...state[action.meta.productId],
          [action.payload.hash]: true,
        },
      };
    case actionTypes.FETCH_PRODUCT_GROUPING_SUCCESS:
      return {
        ...state,
        [action.meta.productId]: {
          ...state[action.meta.productId],
          [action.payload.hash]: false,
        },
      };
    case actionTypes.FETCH_PRODUCT_GROUPING_FAILURE:
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
  action: FetchProductGroupingSuccessAction | AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_GROUPING_SUCCESS:
      return {
        ...state,
        [action.meta.productId]: {
          ...state?.[action.meta.productId],
          [action.payload.hash]: action.payload.result,
        },
      };
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
const productsGroupingReducer: Reducer<ProductsGroupingState> = combineReducers(
  {
    error,
    isLoading,
    results,
  },
);

export default productsGroupingReducer;
