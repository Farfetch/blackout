import type * as actionTypes from '../../actionTypes/index.js';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';
import type { ProductEntity } from '../../../entities/types/index.js';

export interface FetchProductAttributesRequestAction extends Action {
  meta: { productId: ProductEntity['id'] };
  type: typeof actionTypes.FETCH_PRODUCT_ATTRIBUTES_REQUEST;
}

export interface FetchProductAttributesSuccessAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: NormalizedSchema<
    {
      products: Record<ProductEntity['id'], ProductEntity>;
    },
    ProductEntity['id']
  >;
  type: typeof actionTypes.FETCH_PRODUCT_ATTRIBUTES_SUCCESS;
}

export interface FetchProductAttributesFailureAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PRODUCT_ATTRIBUTES_FAILURE;
}

/**
 * Actions dispatched when the fetch product attributes request is made.
 */
export type FetchProductAttributesAction =
  | FetchProductAttributesRequestAction
  | FetchProductAttributesSuccessAction
  | FetchProductAttributesFailureAction;
