import * as actionTypes from '../actionTypes';
import { Action, combineReducers } from 'redux';
import omit from 'lodash/omit';
import type {
  DehydrateProductDetailsAction,
  FetchProductDetailsFailureAction,
  FetchProductDetailsRequestAction,
  FetchProductDetailsSuccessAction,
  ProductsDetailsState,
  ResetProductDetailsEntitiesAction,
  ResetProductDetailsStateAction,
} from '../types';
import type { StoreState } from '../../types';

export const INITIAL_STATE: ProductsDetailsState = {
  error: {},
  isHydrated: {},
  isLoading: {},
};

const error = (state = INITIAL_STATE.error, action: Action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        [(action as FetchProductDetailsSuccessAction).meta.productId]:
          undefined,
      };
    case actionTypes.FETCH_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        [(action as FetchProductDetailsFailureAction).meta.productId]: (
          action as FetchProductDetailsFailureAction
        ).payload.error,
      };
    case actionTypes.RESET_PRODUCT_DETAILS_STATE: {
      const productIds = (action as ResetProductDetailsStateAction).productIds;

      if (!productIds?.length) {
        return state;
      }

      return omit(state, productIds);
    }
    default:
      return state;
  }
};

const isHydrated = (state = INITIAL_STATE.isHydrated, action: Action) => {
  if (action.type === actionTypes.DEHYDRATE_PRODUCT_DETAILS) {
    return {
      ...state,
      [(action as DehydrateProductDetailsAction).meta.productId]: false,
    };
  } else if (action.type === actionTypes.RESET_PRODUCT_DETAILS_STATE) {
    const productIds = (action as ResetProductDetailsStateAction).productIds;

    if (!productIds?.length) {
      return state;
    }

    return omit(state, productIds);
  }

  return state;
};

const isLoading = (state = INITIAL_STATE.isLoading, action: Action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        [(action as FetchProductDetailsRequestAction).meta.productId]: true,
      };
    case actionTypes.FETCH_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        [(action as FetchProductDetailsSuccessAction).meta.productId]: false,
      };
    case actionTypes.FETCH_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        [(action as FetchProductDetailsFailureAction).meta.productId]:
          undefined,
      };
    case actionTypes.RESET_PRODUCT_DETAILS_STATE: {
      const productIds = (action as ResetProductDetailsStateAction).productIds;

      if (!productIds?.length) {
        return state;
      }

      return omit(state, productIds);
    }
    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.RESET_PRODUCT_DETAILS_ENTITIES]: (
    state: NonNullable<StoreState['entities']>,
    action: Action,
  ): StoreState['entities'] => {
    if (!state) {
      return state;
    }

    const productIds = (action as ResetProductDetailsEntitiesAction).productIds;
    const { products, ...rest } = state;

    if (!productIds) {
      return rest;
    }

    const newProductsEntities = omit(products, productIds);

    return {
      ...rest,
      products: newProductsEntities,
    };
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
  action: Action,
): ProductsDetailsState => {
  if (
    action.type === actionTypes.RESET_PRODUCT_DETAILS_STATE &&
    !(action as ResetProductDetailsStateAction).productIds?.length
  ) {
    return INITIAL_STATE;
  }

  return reducers(state, action);
};

export default productsDetailsReducer;
