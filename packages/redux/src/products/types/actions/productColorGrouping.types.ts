import type * as actionTypes from '../../actionTypes';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { NormalizedSchema } from 'normalizr';
import type { ProductEntity } from '../../../entities/types';

export interface FetchProductColorGroupingRequestAction extends Action {
  meta: { productId: ProductEntity['id'] };
  type: typeof actionTypes.FETCH_PRODUCT_COLOR_GROUPING_REQUEST;
}

export interface FetchProductColorGroupingSuccessAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: NormalizedSchema<
    {
      products: Record<ProductEntity['id'], ProductEntity>;
    },
    ProductEntity['id']
  >;
  type: typeof actionTypes.FETCH_PRODUCT_COLOR_GROUPING_SUCCESS;
}

export interface FetchProductColorGroupingFailureAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PRODUCT_COLOR_GROUPING_FAILURE;
}

/**
 * Actions dispatched when the fetch product color grouping request is made.
 */
export type FetchProductColorGroupingAction =
  | FetchProductColorGroupingRequestAction
  | FetchProductColorGroupingSuccessAction
  | FetchProductColorGroupingFailureAction;
