import type * as actionTypes from '../../actionTypes';
import type { Action } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type { NormalizedSchema } from 'normalizr';
import type { ProductEntity } from '../../../entities/types';

export interface FetchProductFittingsRequestAction extends Action {
  meta: { productId: ProductEntity['id'] };
  type: typeof actionTypes.FETCH_PRODUCT_FITTINGS_REQUEST;
}

export interface FetchProductFittingsSuccessAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: NormalizedSchema<
    {
      products: Record<ProductEntity['id'], ProductEntity>;
    },
    ProductEntity['id']
  >;
  type: typeof actionTypes.FETCH_PRODUCT_FITTINGS_SUCCESS;
}

export interface FetchProductFittingsFailureAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: { error: Error };
  type: typeof actionTypes.FETCH_PRODUCT_FITTINGS_FAILURE;
}

/** Actions dispatched when the fetch product fittings request is made. */
export type FetchProductFittingsAction =
  | FetchProductFittingsRequestAction
  | FetchProductFittingsSuccessAction
  | FetchProductFittingsFailureAction;
