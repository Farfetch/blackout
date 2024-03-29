import type * as actionTypes from '../../actionTypes/index.js';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';
import type { ProductEntity } from '../../../entities/types/index.js';

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
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PRODUCT_MEASUREMENTS_FAILURE;
}

/**
 * Actions dispatched when the fetch product measurements request is made.
 */
export type FetchProductMeasurementsAction =
  | FetchProductMeasurementsRequestAction
  | FetchProductMeasurementsSuccessAction
  | FetchProductMeasurementsFailureAction;
