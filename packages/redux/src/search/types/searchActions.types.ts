import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  BlackoutError,
  SearchDidYouMeanQuery,
  SearchDidYouMeanSuggestion,
  SearchIntents,
  SearchSuggestion,
  SearchSuggestionsQuery,
} from '@farfetch/blackout-client';

// SEARCH DID YOU MEAN
export interface FetchSearchDidYouMeanRequestAction extends Action {
  meta: { query: SearchDidYouMeanQuery };
  type: typeof actionTypes.FETCH_SEARCH_DID_YOU_MEAN_REQUEST;
}
export interface FetchSearchDidYouMeanSuccessAction extends Action {
  meta: { query: SearchDidYouMeanQuery };
  type: typeof actionTypes.FETCH_SEARCH_DID_YOU_MEAN_SUCCESS;
  payload: { result: SearchDidYouMeanSuggestion[] };
}
export interface FetchSearchDidYouMeanFailureAction extends Action {
  meta: { query: SearchDidYouMeanQuery };
  type: typeof actionTypes.FETCH_SEARCH_DID_YOU_MEAN_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch search did you mean request is made.
 */
export type FetchSearchDidYouMeanAction =
  | FetchSearchDidYouMeanRequestAction
  | FetchSearchDidYouMeanSuccessAction
  | FetchSearchDidYouMeanFailureAction;

/**
 * Actions dispatched when the reset search did you mean is called.
 */
export interface ResetSearchDidYouMeanAction extends Action {
  type: typeof actionTypes.RESET_SEARCH_DID_YOU_MEAN;
}

// SEARCH INTENTS
export interface FetchSearchIntentsRequestAction extends Action {
  type: typeof actionTypes.FETCH_SEARCH_INTENTS_REQUEST;
}
export interface FetchSearchIntentsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_SEARCH_INTENTS_SUCCESS;
  payload: { result: SearchIntents };
}
export interface FetchSearchIntentsFailureAction extends Action {
  type: typeof actionTypes.FETCH_SEARCH_INTENTS_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch search intents request is made.
 */
export type FetchSearchIntentsAction =
  | FetchSearchIntentsRequestAction
  | FetchSearchIntentsSuccessAction
  | FetchSearchIntentsFailureAction;

/**
 * Actions dispatched when the reset search intents is called.
 */
export interface ResetSearchIntentsAction extends Action {
  type: typeof actionTypes.RESET_SEARCH_INTENTS;
}

// SEARCH SUGGESTIONS
export interface FetchSearchSuggestionsRequestAction extends Action {
  meta: { query: SearchSuggestionsQuery };
  type: typeof actionTypes.FETCH_SEARCH_SUGGESTIONS_REQUEST;
}
export interface FetchSearchSuggestionsSuccessAction extends Action {
  meta: { query: SearchSuggestionsQuery };
  type: typeof actionTypes.FETCH_SEARCH_SUGGESTIONS_SUCCESS;
  payload: { result: SearchSuggestion[] };
}
export interface FetchSearchSuggestionsFailureAction extends Action {
  meta: { query: SearchSuggestionsQuery };
  type: typeof actionTypes.FETCH_SEARCH_SUGGESTIONS_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch search suggestions request is made.
 */
export type FetchSearchSuggestionsAction =
  | FetchSearchSuggestionsRequestAction
  | FetchSearchSuggestionsSuccessAction
  | FetchSearchSuggestionsFailureAction;

/**
 * Actions dispatched when the reset search suggestions is called.
 */
export interface ResetSearchSuggestionsAction extends Action {
  type: typeof actionTypes.RESET_SEARCH_SUGGESTIONS;
}
