import type * as actionTypes from '../../actionTypes';
import type { Action } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type { NormalizedSchema } from 'normalizr';
import type { ProductEntity } from '../../../entities/types';

export interface FetchProductMeasurementsRequestAction extends Action {
  meta: { productId: ProductEntity['id'] };
  type: typeof actionTypes.FETCH_PRODUCT_MEASUREMENTS_REQUEST;
}

export interface FetchProductMeasurementsSuccessAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: NormalizedSchema<
    {
      products: Record<ProductEntity['id'], ProductEntity>;
    },
    ProductEntity['id']
  >;
  type: typeof actionTypes.FETCH_PRODUCT_MEASUREMENTS_SUCCESS;
}

export interface FetchProductMeasurementsFailureAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: { error: Error };
  type: typeof actionTypes.FETCH_PRODUCT_MEASUREMENTS_FAILURE;
}

/**
 * Actions dispatched when the fetch product measurements request is made.
 */
export type FetchProductMeasurementsAction =
  | FetchProductMeasurementsRequestAction
  | FetchProductMeasurementsSuccessAction
  | FetchProductMeasurementsFailureAction;
