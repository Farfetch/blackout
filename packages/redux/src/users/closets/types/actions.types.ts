import type * as actionTypes from '../actionTypes.js';
import type { Action } from 'redux';
import type {
  BlackoutError,
  Closet,
  ClosetItems,
} from '@farfetch/blackout-client';
import type { ClosetItemAdapted } from './state.types.js';

type ClosetPayload = Omit<ClosetItems, 'entries'> & {
  entries: Array<ClosetItemAdapted>;
};

//
// Fetch user closet
//
export interface FetchUserClosetItemsFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_USER_CLOSET_ITEMS_FAILURE;
}

export interface FetchUserClosetItemsRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_CLOSET_ITEMS_REQUEST;
}

export interface FetchUserClosetItemsSuccessAction extends Action {
  payload: ClosetPayload;
  type: typeof actionTypes.FETCH_USER_CLOSET_ITEMS_SUCCESS;
}

export type FetchUserClosetItemsAction =
  | FetchUserClosetItemsRequestAction
  | FetchUserClosetItemsFailureAction
  | FetchUserClosetItemsSuccessAction;

//
// Fetch user closets
//
export interface FetchUserClosetsFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_USER_CLOSETS_FAILURE;
}

export interface FetchUserClosetsRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_CLOSETS_REQUEST;
}

export interface FetchUserClosetsSuccessAction extends Action {
  payload: Closet[];
  type: typeof actionTypes.FETCH_USER_CLOSETS_SUCCESS;
}

export type FetchUserClosetsAction =
  | FetchUserClosetsRequestAction
  | FetchUserClosetsFailureAction
  | FetchUserClosetsSuccessAction;

//
// Remove user closet item
//
export interface RemoveUserClosetItemFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.REMOVE_USER_CLOSET_ITEM_FAILURE;
}

export interface RemoveUserClosetItemRequestAction extends Action {
  type: typeof actionTypes.REMOVE_USER_CLOSET_ITEM_REQUEST;
}

export interface RemoveUserClosetItemSuccessAction extends Action {
  type: typeof actionTypes.REMOVE_USER_CLOSET_ITEM_SUCCESS;
}

export type RemoveUserClosetItemAction =
  | RemoveUserClosetItemRequestAction
  | RemoveUserClosetItemFailureAction
  | RemoveUserClosetItemSuccessAction;

/** Actions dispatched when the reset user closets state request is made. */
export interface ResetUserClosetsStateAction extends Action {
  type: typeof actionTypes.RESET_USER_CLOSETS;
}

/** Actions dispatched when the reset user closet state request is made. */
export interface ResetUserClosetItemsStateAction extends Action {
  type: typeof actionTypes.RESET_USER_CLOSET_ITEMS_STATE;
}
