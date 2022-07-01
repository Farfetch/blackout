import * as actionTypes from '../actionTypes';
import { combineReducers } from 'redux';
import type {
  DehydrateProductDetailsAction,
  FetchProductDetailsAction,
  FetchProductDetailsFailureAction,
  FetchProductDetailsRequestAction,
  ProductsDetailsState,
  ResetProductDetailsStateAction,
} from '../types';
import type { StoreState } from '../../types';

export const INITIAL_STATE: ProductsDetailsState = {
  error: {},
  isHydrated: {},
  isLoading: {},
};

const error = (
  state = INITIAL_STATE.error,
  action: FetchProductDetailsRequestAction | FetchProductDetailsFailureAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        [action.meta.productId]: undefined,
      };
    case actionTypes.FETCH_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        [action.meta.productId]: action.payload.error,
      };
    default:
      return state;
  }
};

const isHydrated = (
  state = INITIAL_STATE.isHydrated,
  action: DehydrateProductDetailsAction,
) => {
  if (action.type === actionTypes.DEHYDRATE_PRODUCT_DETAILS) {
    return {
      ...state,
      [action.meta.productId]: false,
    };
  }
  return state;
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: FetchProductDetailsAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        [action.meta.productId]: true,
      };
    case actionTypes.FETCH_PRODUCT_DETAILS_SUCCESS:
      return { ...state, [action.meta.productId]: false };
    case actionTypes.FETCH_PRODUCT_DETAILS_FAILURE:
      return { ...state, [action.meta.productId]: undefined };
    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.RESET_PRODUCT_DETAILS_ENTITIES]: (
    state: NonNullable<StoreState['entities']>,
  ): StoreState['entities'] => {
    if (!state) {
      return state;
    }
    const { products, ...rest } = state;
    return rest;
  },
};

export const getError = (
  state: ProductsDetailsState,
): ProductsDetailsState['error'] => state.error;
export const getIsHydrated = (
  state: ProductsDetailsState,
): ProductsDetailsState['isHydrated'] => state.isHydrated;
export const getIsLoading = (
  state: ProductsDetailsState,
): ProductsDetailsState['isLoading'] => state.isLoading;

const reducers = combineReducers({
  error,
  isHydrated,
  isLoading,
});

/**
 * Reducer for products details state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const productsDetailsReducer = (
  state: ProductsDetailsState,
  action: FetchProductDetailsAction | ResetProductDetailsStateAction,
): ProductsDetailsState => {
  if (action.type === actionTypes.RESET_PRODUCT_DETAILS_STATE) {
    return INITIAL_STATE;
  }

  return reducers(state, action);
};

export default productsDetailsReducer;
