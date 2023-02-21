import * as actionTypes from '../actionTypes';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import omit from 'lodash/omit';
import type {
  ProductsListsState,
  ResetProductsListsEntitiesAction,
  ResetProductsListsStateAction,
} from '../types';
import type { StoreState } from '../../types';

export const INITIAL_STATE: ProductsListsState = {
  error: {},
  hash: null,
  isHydrated: {},
  isLoading: {},
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_LIST_REQUEST:
      return {
        ...state,
        [action.meta.hash]: undefined,
      };
    case actionTypes.FETCH_PRODUCTS_LIST_FAILURE:
      return {
        ...state,
        [action.meta.hash]: action.payload.error,
      };
    case actionTypes.RESET_PRODUCTS_LISTS_STATE:
      return partialResetStateReducer(
        state,
        action as ResetProductsListsStateAction,
      );
    default:
      return state;
  }
};

const hash = (state = INITIAL_STATE.hash, action: AnyAction) => {
  if (action.type === actionTypes.SET_PRODUCTS_LIST_HASH) {
    return action.meta.hash;
  }

  return state;
};

const isHydrated = (state = INITIAL_STATE.isHydrated, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.DEHYDRATE_PRODUCTS_LIST:
      return {
        ...state,
        [action.meta.hash]: false,
      };
    case actionTypes.RESET_PRODUCTS_LISTS_STATE:
      return partialResetStateReducer(
        state,
        action as ResetProductsListsStateAction,
      );
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_LIST_REQUEST:
      return {
        ...state,
        [action.meta.hash]: true,
      };
    case actionTypes.FETCH_PRODUCTS_LIST_SUCCESS:
    case actionTypes.FETCH_PRODUCTS_LIST_FAILURE:
      return {
        ...state,
        [action.meta.hash]: false,
      };
    case actionTypes.RESET_PRODUCTS_LISTS_STATE:
      return partialResetStateReducer(
        state,
        action as ResetProductsListsStateAction,
      );
    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.RESET_PRODUCTS_LISTS_ENTITIES]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
    if (!state) {
      return state;
    }

    const productsListsHashes = (action as ResetProductsListsEntitiesAction)
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
  action: ResetProductsListsStateAction,
): T {
  const productsListsHashes = action.payload;

  if (!productsListsHashes?.length) {
    return state;
  }

  return omit(state, productsListsHashes) as T;
}

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

const reducers = combineReducers({
  error,
  hash,
  isHydrated,
  isLoading,
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
    action.type === actionTypes.RESET_PRODUCTS_LISTS_STATE &&
    !(action as ResetProductsListsStateAction).payload?.length
  ) {
    return INITIAL_STATE;
  }

  return reducers(state, action);
};

export default productsListsReducer;
