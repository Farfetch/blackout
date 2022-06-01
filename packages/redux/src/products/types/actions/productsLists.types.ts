import type * as actionTypes from '../../actionTypes';
import type { Action } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type {
  FacetEntity,
  ProductEntity,
  ProductsListEntity,
} from '../../../entities/types';
import type { NormalizedSchema } from 'normalizr';

export type ProductsListActionOptions = {
  // If the request result will be cached.
  useCache?: boolean;
  // Allows the listing hash to be set.
  setProductsListHash?: boolean;
};
export interface FetchProductsListRequestAction extends Action {
  meta: { hash: ProductsListEntity['hash'] };
  type: typeof actionTypes.FETCH_PRODUCTS_LIST_REQUEST;
}
export interface FetchProductsListSuccessAction extends Action {
  meta: { hash: ProductsListEntity['hash'] };
  payload: NormalizedSchema<
    {
      products: Record<ProductEntity['id'], ProductEntity>;
      facets: Record<FacetEntity['id'], FacetEntity>;
      productsLists: Record<ProductsListEntity['hash'], ProductsListEntity>;
    },
    ProductsListEntity['hash']
  >;
  type: typeof actionTypes.FETCH_PRODUCTS_LIST_SUCCESS;
}
export interface FetchProductsListFailureAction extends Action {
  meta: { hash: ProductsListEntity['hash'] };
  payload: { error: Error };
  type: typeof actionTypes.FETCH_PRODUCTS_LIST_FAILURE;
}

/**
 * Actions dispatched when the fetch products list request is made.
 */
export type FetchProductsListAction =
  | FetchProductsListRequestAction
  | FetchProductsListSuccessAction
  | FetchProductsListFailureAction;

export interface DehydrateProductsListAction extends Action {
  meta: { hash: ProductsListEntity['hash'] };
  type: typeof actionTypes.DEHYDRATE_PRODUCTS_LIST;
}

export interface SetProductsListHashAction extends Action {
  meta: { hash: ProductsListEntity['hash'] };
  type: typeof actionTypes.SET_PRODUCTS_LIST_HASH;
}

/**
 * Actions dispatched when the reset products lists state is called.
 */
export interface ResetProductsListsStateAction extends Action {
  type: typeof actionTypes.RESET_PRODUCTS_LISTS_STATE;
}

/**
 * Actions dispatched when the reset products lists entities is called.
 */
export interface ResetProductsListsEntitiesAction extends Action {
  type: typeof actionTypes.RESET_PRODUCTS_LISTS_ENTITIES;
}

export type ResetProductsListsAction =
  | ResetProductsListsStateAction
  | ResetProductsListsEntitiesAction;
