import type * as actionTypes from '../../actionTypes';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';
import type { ProductEntity } from '../../../entities/types';

export interface FetchProductMerchantsLocationsRequestAction extends Action {
  meta: { productId: ProductEntity['id'] };
  type: typeof actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_REQUEST;
}

export interface FetchProductMerchantsLocationsSuccessAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: NormalizedSchema<
    {
      products: Record<ProductEntity['id'], ProductEntity>;
    },
    ProductEntity['id']
  >;
  type: typeof actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS;
}

export interface FetchProductMerchantsLocationsFailureAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_FAILURE;
}

/**
 * Actions dispatched when the fetch product merchants locations request is made.
 */
export type FetchProductMerchantsLocationsAction =
  | FetchProductMerchantsLocationsRequestAction
  | FetchProductMerchantsLocationsSuccessAction
  | FetchProductMerchantsLocationsFailureAction;
