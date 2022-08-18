import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers, Reducer } from 'redux';
import type { ProductsVariantsByMerchantsLocationsState } from '../types';

export const INITIAL_STATE: ProductsVariantsByMerchantsLocationsState = {
  error: {},
  isLoading: {},
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_REQUEST:
      return {
        ...state,
        [action.meta.productId]: undefined,
      };
    case actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_FAILURE:
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
    case actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_REQUEST:
      return {
        ...state,
        [action.meta.productId]: true,
      };
    case actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS:
    case actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_FAILURE:
      return { ...state, [action.meta.productId]: false };
    default:
      return state;
  }
};

export const getError = (
  state: ProductsVariantsByMerchantsLocationsState,
): ProductsVariantsByMerchantsLocationsState['error'] => state.error;
export const getIsLoading = (
  state: ProductsVariantsByMerchantsLocationsState,
): ProductsVariantsByMerchantsLocationsState['isLoading'] => state.isLoading;

/**
 * Reducer for product merchants locations.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const productsMerchantsLocationsReducer: Reducer<ProductsVariantsByMerchantsLocationsState> =
  combineReducers({
    error,
    isLoading,
  });

export default productsMerchantsLocationsReducer;
