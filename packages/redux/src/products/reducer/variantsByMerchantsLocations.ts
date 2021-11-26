/**
 * @module products/reducer
 * @category Products merchants locations
 * @subcategory Reducer
 */
import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type {
  FetchProductMerchantsLocationsAction,
  FetchProductMerchantsLocationsFailureAction,
  FetchProductMerchantsLocationsRequestAction,
  ProductsVariantsByMerchantsLocationsState,
} from '../types';

export const INITIAL_STATE: ProductsVariantsByMerchantsLocationsState = {
  error: {},
  isLoading: {},
};

const error = (
  state = INITIAL_STATE.error,
  action:
    | FetchProductMerchantsLocationsRequestAction
    | FetchProductMerchantsLocationsFailureAction,
) => {
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

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: FetchProductMerchantsLocationsAction | AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_REQUEST:
      return {
        ...state,
        [action.meta.productId]: true,
      };
    case actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS:
      return { ...state, [action.meta.productId]: false };
    case actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_FAILURE:
      return { ...state, [action.meta.productId]: undefined };
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
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
const productsMerchantsLocationsReducer = combineReducers({
  error,
  isLoading,
});

export default productsMerchantsLocationsReducer;
