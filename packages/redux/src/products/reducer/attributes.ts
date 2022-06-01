import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type {
  FetchProductAttributesAction,
  FetchProductAttributesFailureAction,
  FetchProductAttributesRequestAction,
  ProductsAttributesState,
} from '../types';

export const INITIAL_STATE: ProductsAttributesState = {
  error: {},
  isLoading: {},
};

const error = (
  state = INITIAL_STATE.error,
  action:
    | FetchProductAttributesRequestAction
    | FetchProductAttributesFailureAction,
) => {
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

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: FetchProductAttributesAction | AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_ATTRIBUTES_REQUEST:
      return {
        ...state,
        [action.meta.productId]: true,
      };
    case actionTypes.FETCH_PRODUCT_ATTRIBUTES_SUCCESS:
      return { ...state, [action.meta.productId]: false };
    case actionTypes.FETCH_PRODUCT_ATTRIBUTES_FAILURE:
      return { ...state, [action.meta.productId]: undefined };
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
const productsAttributesReducer = combineReducers({
  error,
  isLoading,
});

export default productsAttributesReducer;
