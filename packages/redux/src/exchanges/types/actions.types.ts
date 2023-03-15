import type * as actionTypes from '../actionTypes.js';
import type { Action } from 'redux';
import type {
  BlackoutError,
  Exchange,
  ExchangeBookRequest,
  ExchangeFilter,
} from '@farfetch/blackout-client';

export interface FetchExchangeRequestAction extends Action {
  type: typeof actionTypes.FETCH_EXCHANGE_REQUEST;
}
export interface FetchExchangeSuccessAction extends Action {
  type: typeof actionTypes.FETCH_EXCHANGE_SUCCESS;
  payload: Exchange;
}
export interface FetchExchangeFailureAction extends Action {
  type: typeof actionTypes.FETCH_EXCHANGE_FAILURE;
  payload: { error: BlackoutError };
}

/** Actions dispatched when the fetch exchange request is made. */
export type FetchExchangeAction =
  | FetchExchangeRequestAction
  | FetchExchangeSuccessAction
  | FetchExchangeFailureAction;

export interface FetchExchangeBookRequestRequestAction extends Action {
  type: typeof actionTypes.FETCH_EXCHANGE_BOOK_REQUEST_REQUEST;
}
export interface FetchExchangeBookRequestSuccessAction extends Action {
  type: typeof actionTypes.FETCH_EXCHANGE_BOOK_REQUEST_SUCCESS;
  payload: ExchangeBookRequest;
}
export interface FetchExchangeBookRequestFailureAction extends Action {
  type: typeof actionTypes.FETCH_EXCHANGE_BOOK_REQUEST_FAILURE;
  payload: { error: BlackoutError };
}

/** Actions dispatched when the fetch exchange book request request is made. */
export type FetchExchangeBookRequestAction =
  | FetchExchangeBookRequestRequestAction
  | FetchExchangeBookRequestSuccessAction
  | FetchExchangeBookRequestFailureAction;

export interface CreateExchangeRequestAction extends Action {
  type: typeof actionTypes.CREATE_EXCHANGE_REQUEST;
}
export interface CreateExchangeSuccessAction extends Action {
  type: typeof actionTypes.CREATE_EXCHANGE_SUCCESS;
}
export interface CreateExchangeFailureAction extends Action {
  type: typeof actionTypes.CREATE_EXCHANGE_FAILURE;
  payload: { error: BlackoutError };
}

/** Actions dispatched when the create exchange request is made. */
export type CreateExchangeAction =
  | CreateExchangeRequestAction
  | CreateExchangeSuccessAction
  | CreateExchangeFailureAction;

export interface CreateExchangeFilterRequestAction extends Action {
  type: typeof actionTypes.CREATE_EXCHANGE_FILTER_REQUEST;
}
export interface CreateExchangeFilterSuccessAction extends Action {
  type: typeof actionTypes.CREATE_EXCHANGE_FILTER_SUCCESS;
  payload: ExchangeFilter;
}
export interface CreateExchangeFilterFailureAction extends Action {
  type: typeof actionTypes.CREATE_EXCHANGE_FILTER_FAILURE;
  payload: { error: BlackoutError };
}

/** Actions dispatched when the create exchange filter request is made. */
export type CreateExchangeFilterAction =
  | CreateExchangeFilterRequestAction
  | CreateExchangeFilterSuccessAction
  | CreateExchangeFilterFailureAction;

export interface CreateExchangeBookRequestRequestAction extends Action {
  type: typeof actionTypes.CREATE_EXCHANGE_BOOK_REQUEST_REQUEST;
}
export interface CreateExchangeBookRequestSuccessAction extends Action {
  type: typeof actionTypes.CREATE_EXCHANGE_BOOK_REQUEST_SUCCESS;
}
export interface CreateExchangeBookRequestFailureAction extends Action {
  type: typeof actionTypes.CREATE_EXCHANGE_BOOK_REQUEST_FAILURE;
  payload: { error: BlackoutError };
}

/** Actions dispatched when the create an exchange book request request is made. */
export type CreateExchangeBookRequestAction =
  | CreateExchangeBookRequestRequestAction
  | CreateExchangeBookRequestSuccessAction
  | CreateExchangeBookRequestFailureAction;

/** Actions dispatched when the reset exchanges state request is made. */
export interface ResetExchangesStateAction extends Action {
  type: typeof actionTypes.RESET_EXCHANGES;
}

/** Actions dispatched when the reset exchange filter state request is made. */
export interface ResetExchangeFilterStateAction extends Action {
  type: typeof actionTypes.RESET_EXCHANGE_FILTER_STATE;
}

/** Actions dispatched when the reset exchange book request state request is made. */
export interface ResetExchangeBookRequestStateAction extends Action {
  type: typeof actionTypes.RESET_EXCHANGE_BOOK_REQUEST_STATE;
}
