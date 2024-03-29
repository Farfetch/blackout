import type * as actionTypes from '../../actionTypes/index.js';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';
import type { ProductEntity } from '../../../entities/types/index.js';

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
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PRODUCT_SIZEGUIDES_FAILURE;
}

/**
 * Actions dispatched when the fetch product sizeguides request is made.
 */
export type FetchProductSizeGuidesAction =
  | FetchProductSizeGuidesRequestAction
  | FetchProductSizeGuidesSuccessAction
  | FetchProductSizeGuidesFailureAction;
