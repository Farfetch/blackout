/**
 * @module products/reducer
 * @category Products fittings
 * @subcategory Reducer
 */
import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type {
  FetchProductFittingsAction,
  FetchProductFittingsFailureAction,
  FetchProductFittingsRequestAction,
  ProductsFittingsState,
} from '../types';

export const INITIAL_STATE: ProductsFittingsState = {
  error: {},
  isLoading: {},
};

const error = (
  state = INITIAL_STATE.error,
  action: FetchProductFittingsRequestAction | FetchProductFittingsFailureAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_FITTINGS_REQUEST:
      return {
        ...state,
        [action.meta.productId]: undefined,
      };
    case actionTypes.FETCH_PRODUCT_FITTINGS_FAILURE:
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
  action: FetchProductFittingsAction | AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_FITTINGS_REQUEST:
      return {
        ...state,
        [action.meta.productId]: true,
      };
    case actionTypes.FETCH_PRODUCT_FITTINGS_SUCCESS:
      return { ...state, [action.meta.productId]: false };
    case actionTypes.FETCH_PRODUCT_FITTINGS_FAILURE:
      return { ...state, [action.meta.productId]: undefined };
    default:
      return state;
  }
};

export const getError = (
  state: ProductsFittingsState,
): ProductsFittingsState['error'] => state.error;
export const getIsLoading = (
  state: ProductsFittingsState,
): ProductsFittingsState['isLoading'] => state.isLoading;

/**
 * Reducer for products fittings.
 *
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
const productsFittingsReducer = combineReducers({
  error,
  isLoading,
});

export default productsFittingsReducer;
