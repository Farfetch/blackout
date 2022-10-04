import type * as actionTypes from '../../actionTypes';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { GroupingAdapted, ProductEntity } from '../../../entities/types';

export interface FetchProductGroupingRequestAction extends Action {
  meta: { productId: ProductEntity['id'] };
  type: typeof actionTypes.FETCH_PRODUCT_GROUPING_REQUEST;
  payload: { hash: string };
}

export interface FetchProductGroupingSuccessAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: { result: GroupingAdapted; hash: string };
  type: typeof actionTypes.FETCH_PRODUCT_GROUPING_SUCCESS;
}

export interface FetchProductGroupingFailureAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: { error: BlackoutError; hash: string };
  type: typeof actionTypes.FETCH_PRODUCT_GROUPING_FAILURE;
}

/**
 * Actions dispatched when the fetch product grouping request is made.
 */
export type FetchProductGroupingAction =
  | FetchProductGroupingRequestAction
  | FetchProductGroupingSuccessAction
  | FetchProductGroupingFailureAction;
