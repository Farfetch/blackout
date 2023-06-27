import * as actionTypes from '../actionTypes/index.js';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import { omit } from 'lodash-es';
import type {
  ProductsListsState,
  ResetProductListsEntitiesAction,
  ResetProductListsStateAction,
} from '../types/index.js';
import type { StoreState } from '../../types/index.js';

export const INITIAL_STATE: ProductsListsState = {
  error: {},
  hash: null,
  isHydrated: {},
  isLoading: {},
  productListingFacets: {
    error: null,
    isLoading: false,
    result: [],
  },
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_LISTING_REQUEST:
      return {
        ...state,
        [action.meta.hash]: undefined,
      };
    case actionTypes.FETCH_PRODUCT_LISTING_FAILURE:
      return {
        ...state,
        [action.meta.hash]: action.payload.error,
      };
    case actionTypes.RESET_PRODUCT_LISTINGS_STATE:
      return partialResetStateReducer(
        state,
        action as ResetProductListsStateAction,
      );
    default:
      return state;
  }
};

const hash = (state = INITIAL_STATE.hash, action: AnyAction) => {
  if (action.type === actionTypes.SET_PRODUCT_LISTING_HASH) {
    return action.meta.hash;
  }

  return state;
};

const isHydrated = (state = INITIAL_STATE.isHydrated, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.DEHYDRATE_PRODUCT_LISTING:
      return {
        ...state,
        [action.meta.hash]: false,
      };
    case actionTypes.RESET_PRODUCT_LISTINGS_STATE:
      return partialResetStateReducer(
        state,
        action as ResetProductListsStateAction,
      );
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_LISTING_REQUEST:
      return {
        ...state,
        [action.meta.hash]: true,
      };
    case actionTypes.FETCH_PRODUCT_LISTING_SUCCESS:
    case actionTypes.FETCH_PRODUCT_LISTING_FAILURE:
      return {
        ...state,
        [action.meta.hash]: false,
      };
    case actionTypes.RESET_PRODUCT_LISTINGS_STATE:
      return partialResetStateReducer(
        state,
        action as ResetProductListsStateAction,
      );
    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.RESET_PRODUCT_LISTING_ENTITIES]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
    if (!state) {
      return state;
    }

    const productsListsHashes = (action as ResetProductListsEntitiesAction)
      .payload;
    const { productsLists, ...rest } = state;

    if (!productsListsHashes?.length) {
      return rest;
    }

    const newProductsListsEntities = omit(productsLists, productsListsHashes);

    return {
      ...rest,
      productsLists: newProductsListsEntities,
    };
  },
};

function partialResetStateReducer<T extends object | null | undefined>(
  state: T,
  action: ResetProductListsStateAction,
): T {
  const productsListsHashes = action.payload;

  if (!productsListsHashes?.length) {
    return state;
  }

  return omit(state, productsListsHashes) as T;
}

const productListingFacets = (
  state = INITIAL_STATE.productListingFacets,
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_LISTING_FACETS_REQUEST:
      return {
        ...INITIAL_STATE.productListingFacets,
        isLoading: true,
      };
    case actionTypes.FETCH_PRODUCT_LISTING_FACETS_SUCCESS:
      return {
        ...INITIAL_STATE.productListingFacets,
        result: action.payload.result,
      };
    case actionTypes.FETCH_PRODUCT_LISTING_FACETS_FAILURE:
      return {
        ...INITIAL_STATE.productListingFacets,
        error: action.payload.error,
      };
    case actionTypes.RESET_PRODUCT_LISTING_FACETS:
      return INITIAL_STATE.productListingFacets;
    default:
      return state;
  }
};

export const getError = (
  state: ProductsListsState,
): ProductsListsState['error'] => state.error;
export const getHash = (
  state: ProductsListsState,
): ProductsListsState['hash'] => state.hash;
export const getIsHydrated = (
  state: ProductsListsState,
): ProductsListsState['isHydrated'] => state.isHydrated;
export const getIsLoading = (
  state: ProductsListsState,
): ProductsListsState['isLoading'] => state.isLoading;
export const getListingFacetsState = (state: ProductsListsState) =>
  state.productListingFacets;

const reducers = combineReducers({
  error,
  hash,
  isHydrated,
  isLoading,
  productListingFacets,
});

/**
 * Reducer for products lists state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const productsListsReducer: Reducer<ProductsListsState> = (state, action) => {
  if (
    action.type === actionTypes.RESET_PRODUCT_LISTINGS_STATE &&
    !(action as ResetProductListsStateAction).payload?.length
  ) {
    return INITIAL_STATE;
  }

  return reducers(state, action);
};

export default productsListsReducer;
