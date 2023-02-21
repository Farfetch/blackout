import * as actionTypes from '../actionTypes';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import type { ProductsOutfitsState } from '../types';

export const INITIAL_STATE: ProductsOutfitsState = {
  error: {},
  isLoading: {},
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_OUTFITS_REQUEST:
      return {
        ...state,
        [action.meta.productId]: undefined,
      };
    case actionTypes.FETCH_PRODUCT_OUTFITS_FAILURE:
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
    case actionTypes.FETCH_PRODUCT_OUTFITS_REQUEST:
      return {
        ...state,
        [action.meta.productId]: true,
      };
    case actionTypes.FETCH_PRODUCT_OUTFITS_SUCCESS:
    case actionTypes.FETCH_PRODUCT_OUTFITS_FAILURE:
      return { ...state, [action.meta.productId]: false };
    default:
      return state;
  }
};

export const getError = (
  state: ProductsOutfitsState,
): ProductsOutfitsState['error'] => state.error;
export const getIsLoading = (
  state: ProductsOutfitsState,
): ProductsOutfitsState['isLoading'] => state.isLoading;

/**
 * Reducer for product outfits.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const productsOutfitsReducer: Reducer<ProductsOutfitsState> = combineReducers({
  error,
  isLoading,
});

export default productsOutfitsReducer;
