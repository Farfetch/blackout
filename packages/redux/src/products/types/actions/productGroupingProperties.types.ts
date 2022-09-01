import type * as actionTypes from '../../actionTypes';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';
import type { ProductEntity } from '../../../entities/types';

export interface FetchProductGroupingPropertiesRequestAction extends Action {
  meta: { productId: ProductEntity['id'] };
  type: typeof actionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES_REQUEST;
}

export interface FetchProductGroupingPropertiesSuccessAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: NormalizedSchema<
    {
      products: Record<ProductEntity['id'], ProductEntity>;
    },
    ProductEntity['id']
  >;
  type: typeof actionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES_SUCCESS;
}

export interface FetchProductGroupingPropertiesFailureAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES_FAILURE;
}

/**
 * Actions dispatched when the fetch product grouping properties request is made.
 */
export type FetchProductGroupingPropertiesAction =
  | FetchProductGroupingPropertiesRequestAction
  | FetchProductGroupingPropertiesSuccessAction
  | FetchProductGroupingPropertiesFailureAction;
