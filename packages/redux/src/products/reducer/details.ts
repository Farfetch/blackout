import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers, Reducer } from 'redux';
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

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
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
    case actionTypes.RESET_PRODUCT_DETAILS_STATE:
      return partialResetStateReducer(
        state,
        action as ResetProductDetailsStateAction,
      );
    default:
      return state;
  }
};

const isHydrated = (state = INITIAL_STATE.isHydrated, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.DEHYDRATE_PRODUCT_DETAILS:
      return {
        ...state,
        [(action as DehydrateProductDetailsAction).meta.productId]: false,
      };
    case actionTypes.RESET_PRODUCT_DETAILS_STATE:
      return partialResetStateReducer(
        state,
        action as ResetProductDetailsStateAction,
      );
  }

  return state;
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        [(action as FetchProductDetailsRequestAction).meta.productId]: true,
      };
    case actionTypes.FETCH_PRODUCT_DETAILS_SUCCESS:
    case actionTypes.FETCH_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        [(action as FetchProductDetailsSuccessAction).meta.productId]: false,
      };
    case actionTypes.RESET_PRODUCT_DETAILS_STATE: {
      return partialResetStateReducer(
        state,
        action as ResetProductDetailsStateAction,
      );
    }
    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.RESET_PRODUCT_DETAILS_ENTITIES]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
    if (!state) {
      return state;
    }

    const productIds = (action as ResetProductDetailsEntitiesAction).payload;
    const { products, ...rest } = state;

    if (!productIds?.length) {
      return rest;
    }

    const newProductsEntities = omit(products, productIds);

    return {
      ...rest,
      products: newProductsEntities,
    };
  },
};

function partialResetStateReducer<T extends object | null | undefined>(
  state: T,
  action: ResetProductDetailsStateAction,
): T {
  const productIds = action.payload;

  if (!productIds?.length) {
    return state;
  }

  return omit(state, productIds) as T;
}

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
const productsDetailsReducer: Reducer<ProductsDetailsState> = (
  state,
  action,
) => {
  if (
    action.type === actionTypes.RESET_PRODUCT_DETAILS_STATE &&
    !(action as ResetProductDetailsStateAction).payload?.length
  ) {
    return INITIAL_STATE;
  }

  return reducers(state, action);
};

export default productsDetailsReducer;
