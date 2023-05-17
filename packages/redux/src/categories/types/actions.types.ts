import type * as actionTypes from '../actionTypes.js';
import type { Action } from 'redux';
import type { BlackoutError, Category } from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';

type Payload = NormalizedSchema<
  { categories: Record<Category['id'], Category> },
  Array<Category['id']>
>;

export interface FetchCategoriesRequestAction extends Action {
  type: typeof actionTypes.FETCH_CATEGORIES_REQUEST;
}
export interface FetchCategoriesSuccessAction extends Action {
  type: typeof actionTypes.FETCH_CATEGORIES_SUCCESS;
  payload: Payload;
}
export interface FetchCategoriesFailureAction extends Action {
  type: typeof actionTypes.FETCH_CATEGORIES_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch categories request is made.
 */
export type FetchCategoriesAction =
  | FetchCategoriesRequestAction
  | FetchCategoriesSuccessAction
  | FetchCategoriesFailureAction;

export interface FetchCategoryRequestAction extends Action {
  meta: { id: Category['id'] };
  type: typeof actionTypes.FETCH_CATEGORY_REQUEST;
}
export interface FetchCategorySuccessAction extends Action {
  meta: { id: Category['id'] };
  type: typeof actionTypes.FETCH_CATEGORY_SUCCESS;
  payload: Payload;
}
export interface FetchCategoryFailureAction extends Action {
  meta: { id: Category['id'] };
  type: typeof actionTypes.FETCH_CATEGORY_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch category request is made.
 */
export type FetchCategoryAction =
  | FetchCategoryRequestAction
  | FetchCategorySuccessAction
  | FetchCategoryFailureAction;

export interface FetchTopCategoriesRequestAction extends Action {
  type: typeof actionTypes.FETCH_TOP_CATEGORIES_REQUEST;
}
export interface FetchTopCategoriesSuccessAction extends Action {
  type: typeof actionTypes.FETCH_TOP_CATEGORIES_SUCCESS;
  payload: Payload;
}
export interface FetchTopCategoriesFailureAction extends Action {
  type: typeof actionTypes.FETCH_TOP_CATEGORIES_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch top categories request is made.
 */
export type FetchTopCategoriesAction =
  | FetchTopCategoriesRequestAction
  | FetchTopCategoriesSuccessAction
  | FetchTopCategoriesFailureAction;

/**
 * Actions dispatched when the reset categories is called.
 */
export interface ResetCategoriesStateAction extends Action {
  type: typeof actionTypes.RESET_CATEGORIES_STATE;
}
