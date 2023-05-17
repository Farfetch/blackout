import type * as actionTypes from '../../actionTypes/index.js';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client';
import type {
  GroupingPropertiesAdapted,
  ProductEntity,
} from '../../../entities/types/index.js';

export interface FetchProductGroupingPropertiesRequestAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: { hash: string };
  type: typeof actionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES_REQUEST;
}

export interface FetchProductGroupingPropertiesSuccessAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: {
    hash: string;
    result: GroupingPropertiesAdapted;
  };
  type: typeof actionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES_SUCCESS;
}

export interface FetchProductGroupingPropertiesFailureAction extends Action {
  meta: { productId: ProductEntity['id'] };
  payload: { error: BlackoutError; hash: string };
  type: typeof actionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES_FAILURE;
}

/**
 * Actions dispatched when the fetch product grouping properties request is made.
 */
export type FetchProductGroupingPropertiesAction =
  | FetchProductGroupingPropertiesRequestAction
  | FetchProductGroupingPropertiesSuccessAction
  | FetchProductGroupingPropertiesFailureAction;
