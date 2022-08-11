import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type { ProductsSizeGuidesState } from '../types';

export const INITIAL_STATE: ProductsSizeGuidesState = {
  error: {},
  isLoading: {},
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
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

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_SIZEGUIDES_REQUEST:
      return {
        ...state,
        [action.meta.productId]: true,
      };
    case actionTypes.FETCH_PRODUCT_SIZEGUIDES_SUCCESS:
    case actionTypes.FETCH_PRODUCT_SIZEGUIDES_FAILURE:
      return { ...state, [action.meta.productId]: false };
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
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const productsSizeGuidesReducer = combineReducers({
  error,
  isLoading,
});

export default productsSizeGuidesReducer;
