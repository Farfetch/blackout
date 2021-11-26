import type * as actionTypes from '../../actionTypes';
import type { Action } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type { NormalizedSchema } from 'normalizr';
import type { ProductEntity } from '../../../entities/types';

export interface FetchProductSizeGuidesRequestAction extends Action {
  meta: { productId: ProductEntity['id'] };
  type: typeof actionTypes.FETCH_PRODUCT_SIZEGUIDES_REQUEST;
}

export interface FetchProductSizeGuidesSuccessAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: NormalizedSchema<
    {
      products: Record<ProductEntity['id'], ProductEntity>;
    },
    ProductEntity['id']
  >;
  type: typeof actionTypes.FETCH_PRODUCT_SIZEGUIDES_SUCCESS;
}

export interface FetchProductSizeGuidesFailureAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: { error: Error };
  type: typeof actionTypes.FETCH_PRODUCT_SIZEGUIDES_FAILURE;
}

/** Actions dispatched when the fetch product sizeguides request is made. */
export type FetchProductSizeGuidesAction =
  | FetchProductSizeGuidesRequestAction
  | FetchProductSizeGuidesSuccessAction
  | FetchProductSizeGuidesFailureAction;
