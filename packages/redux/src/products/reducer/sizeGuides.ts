/**
 * @module products/reducer
 * @category Products size guides
 * @subcategory Reducer
 */
import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type {
  FetchProductSizeGuidesAction,
  FetchProductSizeGuidesFailureAction,
  FetchProductSizeGuidesRequestAction,
  ProductsSizeGuidesState,
} from '../types';

export const INITIAL_STATE: ProductsSizeGuidesState = {
  error: {},
  isLoading: {},
};

const error = (
  state = INITIAL_STATE.error,
  action:
    | FetchProductSizeGuidesRequestAction
    | FetchProductSizeGuidesFailureAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_SIZEGUIDES_REQUEST:
      return {
        ...state,
        [action.meta.productId]: undefined,
      };
    case actionTypes.FETCH_PRODUCT_SIZEGUIDES_FAILURE:
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
  action: FetchProductSizeGuidesAction | AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_SIZEGUIDES_REQUEST:
      return {
        ...state,
        [action.meta.productId]: true,
      };
    case actionTypes.FETCH_PRODUCT_SIZEGUIDES_SUCCESS:
      return { ...state, [action.meta.productId]: false };
    case actionTypes.FETCH_PRODUCT_SIZEGUIDES_FAILURE:
      return { ...state, [action.meta.productId]: undefined };
    default:
      return state;
  }
};

export const getError = (
  state: ProductsSizeGuidesState,
): ProductsSizeGuidesState['error'] => state.error;
export const getIsLoading = (
  state: ProductsSizeGuidesState,
): ProductsSizeGuidesState['isLoading'] => state.isLoading;

/**
 * Reducer for product size guides.
 *
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
const productsSizeGuidesReducer = combineReducers({
  error,
  isLoading,
});

export default productsSizeGuidesReducer;
