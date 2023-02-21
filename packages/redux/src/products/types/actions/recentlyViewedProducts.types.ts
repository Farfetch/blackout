import type * as actionTypes from '../../actionTypes';
import type { Action } from 'redux';
import type {
  BlackoutError,
  RecentlyViewedProducts,
} from '@farfetch/blackout-client';

interface FetchRecentlyViewedProductsRequestAction extends Action {
  type: typeof actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_REQUEST;
}

interface FetchRecentlyViewedProductsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS;
  payload: RecentlyViewedProducts;
}

interface FetchRecentlyViewedProductsFailureAction extends Action {
  type: typeof actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch recently viewed products request is made.
 */
export type FetchRecentlyViewedProductsAction =
  | FetchRecentlyViewedProductsRequestAction
  | FetchRecentlyViewedProductsSuccessAction
  | FetchRecentlyViewedProductsFailureAction;

interface RemoveRecentlyViewedProductRequestAction extends Action {
  type: typeof actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_REQUEST;
  meta: { productId: number };
}

interface RemoveRecentlyViewedProductSuccessAction extends Action {
  type: typeof actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_SUCCESS;
  meta: { productId: number };
}

interface RemoveRecentlyViewedProductFailureAction extends Action {
  type: typeof actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE;
  payload: { error: BlackoutError };
  meta: { productId: number };
}

/**
 * Actions dispatched when remove recently viewed product is made.
 */
export type RemoveRecentlyViewedProductAction =
  | RemoveRecentlyViewedProductRequestAction
  | RemoveRecentlyViewedProductSuccessAction
  | RemoveRecentlyViewedProductFailureAction;

/**
 * Actions dispatched when the save remove recently viewed product action is
 * called.
 */
export interface SaveRecentlyViewedProductSchemaStateAction extends Action {
  type: typeof actionTypes.SAVE_RECENTLY_VIEWED_PRODUCT;
}
