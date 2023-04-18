import type * as actionTypes from '../../actionTypes/index.js';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client';
import type {
  FacetEntity,
  ProductEntity,
  ProductListingEntity,
} from '../../../entities/types/index.js';
import type { NormalizedSchema } from 'normalizr';

export type ProductListActionOptions = {
  // If the request result will be cached.
  useCache?: boolean;
  // Allows the listing hash to be set.
  setProductsListHash?: boolean;
};
export interface FetchProductListRequestAction extends Action {
  meta: { hash: ProductListingEntity['hash'] };
  type: typeof actionTypes.FETCH_PRODUCTS_LIST_REQUEST;
}
export interface FetchProductListSuccessAction extends Action {
  meta: { hash: ProductListingEntity['hash'] };
  payload: NormalizedSchema<
    {
      products: Record<ProductEntity['id'], ProductEntity>;
      facets: Record<FacetEntity['id'], FacetEntity>;
      productsLists: Record<ProductListingEntity['hash'], ProductListingEntity>;
    },
    ProductListingEntity['hash']
  >;
  type: typeof actionTypes.FETCH_PRODUCTS_LIST_SUCCESS;
}
export interface FetchProductListFailureAction extends Action {
  meta: { hash: ProductListingEntity['hash'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PRODUCTS_LIST_FAILURE;
}

/**
 * Actions dispatched when the fetch product list request is made.
 */
export type FetchProductListAction =
  | FetchProductListRequestAction
  | FetchProductListSuccessAction
  | FetchProductListFailureAction;

export interface DehydrateProductListAction extends Action {
  meta: { hash: ProductListingEntity['hash'] };
  type: typeof actionTypes.DEHYDRATE_PRODUCTS_LIST;
}

export interface SetProductListHashAction extends Action {
  meta: { hash: ProductListingEntity['hash'] };
  type: typeof actionTypes.SET_PRODUCTS_LIST_HASH;
}

/**
 * Actions dispatched when the reset products lists state is called.
 */
export interface ResetProductListsStateAction extends Action {
  type: typeof actionTypes.RESET_PRODUCTS_LISTS_STATE;
  payload: Array<string> | undefined;
}

/**
 * Actions dispatched when the reset products lists entities is called.
 */
export interface ResetProductListsEntitiesAction extends Action {
  type: typeof actionTypes.RESET_PRODUCTS_LISTS_ENTITIES;
  payload: Array<string> | undefined;
}

export type ResetProductListsAction =
  | ResetProductListsStateAction
  | ResetProductListsEntitiesAction;
