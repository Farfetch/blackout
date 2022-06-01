import type * as actionTypes from '../../actionTypes';
import type { Action } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type { NormalizedSchema } from 'normalizr';
import type { ProductEntity } from '../../../entities/types';

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
  payload: { error: Error };
  type: typeof actionTypes.FETCH_PRODUCT_ATTRIBUTES_FAILURE;
}

/**
 * Actions dispatched when the fetch product attributes request is made.
 */
export type FetchProductAttributesAction =
  | FetchProductAttributesRequestAction
  | FetchProductAttributesSuccessAction
  | FetchProductAttributesFailureAction;
