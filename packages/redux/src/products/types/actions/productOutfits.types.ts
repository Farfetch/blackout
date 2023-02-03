import type * as actionTypes from '../../actionTypes';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';
import type { ProductEntity } from '../../../entities/types';

export interface FetchProductOutfitsRequestAction extends Action {
  meta: { productId: ProductEntity['id'] };
  type: typeof actionTypes.FETCH_PRODUCT_OUTFITS_REQUEST;
}

export interface FetchProductOutfitsSuccessAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: NormalizedSchema<
    {
      products: Record<ProductEntity['id'], ProductEntity>;
    },
    ProductEntity['id']
  >;
  type: typeof actionTypes.FETCH_PRODUCT_OUTFITS_SUCCESS;
}

export interface FetchProductOutfitsFailureAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PRODUCT_OUTFITS_FAILURE;
}

/**
 * Actions dispatched when the fetch product outfits request is made.
 */
export type FetchProductOutfitsAction =
  | FetchProductOutfitsRequestAction
  | FetchProductOutfitsSuccessAction
  | FetchProductOutfitsFailureAction;
