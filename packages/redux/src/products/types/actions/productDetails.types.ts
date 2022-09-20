import type * as actionTypes from '../../actionTypes';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';
import type { ProductEntity } from '../../../entities/types';

export interface FetchProductDetailsRequestAction extends Action {
  meta: { productId: ProductEntity['id'] };
  type: typeof actionTypes.FETCH_PRODUCT_DETAILS_REQUEST;
}

export interface FetchProductDetailsSuccessAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: NormalizedSchema<
    {
      products: Record<ProductEntity['id'], ProductEntity>;
    },
    ProductEntity['id']
  >;
  type: typeof actionTypes.FETCH_PRODUCT_DETAILS_SUCCESS;
}

export interface FetchProductDetailsFailureAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PRODUCT_DETAILS_FAILURE;
}

/**
 * Actions dispatched when the fetch product details request is made.
 */
export type FetchProductDetailsAction =
  | FetchProductDetailsRequestAction
  | FetchProductDetailsSuccessAction
  | FetchProductDetailsFailureAction;

export interface DehydrateProductDetailsAction extends Action {
  meta: { productId: ProductEntity['id'] };
  type: typeof actionTypes.DEHYDRATE_PRODUCT_DETAILS;
}

/**
 * Actions dispatched when the reset product details state is called.
 */
export interface ResetProductDetailsStateAction extends Action {
  type: typeof actionTypes.RESET_PRODUCT_DETAILS_STATE;
  payload: Array<ProductEntity['id']> | undefined;
}

/**
 * Actions dispatched when the reset product details entities is called.
 */
export interface ResetProductDetailsEntitiesAction extends Action {
  type: typeof actionTypes.RESET_PRODUCT_DETAILS_ENTITIES;
  payload: Array<ProductEntity['id']> | undefined;
}

export type ResetProductDetailsAction =
  | ResetProductDetailsStateAction
  | ResetProductDetailsEntitiesAction;
