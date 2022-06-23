import type * as actionTypes from '../../actionTypes';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';
import type { ProductEntity } from '../../../entities/types';

export interface FetchProductSizesRequestAction extends Action {
  meta: { productId: ProductEntity['id'] };
  type: typeof actionTypes.FETCH_PRODUCT_SIZES_REQUEST;
}

export interface FetchProductSizesSuccessAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: NormalizedSchema<
    {
      products: Record<ProductEntity['id'], ProductEntity>;
    },
    ProductEntity['id']
  >;
  type: typeof actionTypes.FETCH_PRODUCT_SIZES_SUCCESS;
}

export interface FetchProductSizesFailureAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PRODUCT_SIZES_FAILURE;
}

/**
 * Actions dispatched when the fetch product sizes request is made.
 */
export type FetchProductSizesAction =
  | FetchProductSizesRequestAction
  | FetchProductSizesSuccessAction
  | FetchProductSizesFailureAction;
