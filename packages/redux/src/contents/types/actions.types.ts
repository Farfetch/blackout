import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  BlackoutError,
  CommercePagesContent,
  ContentTypesEntries,
  QueryCommercePages,
  QueryContents,
  QuerySEO,
  SEOMetadata,
} from '@farfetch/blackout-client';
import type { Hash, Pathname, SearchResultsReducer } from '../types';

export interface ActionFetchContentRequest extends Action {
  type: typeof actionTypes.FETCH_CONTENT_REQUEST;
  meta: { query: QueryContents };
  payload: { hash: Hash };
}

export interface ActionFetchContentRequestSuccess extends Action {
  type: typeof actionTypes.FETCH_CONTENT_SUCCESS;
  meta: { query: QueryContents };
  payload: {
    result: SearchResultsReducer['result'];
    hash: Hash;
  };
}

export interface ActionFetchContentRequestFailure extends Action {
  type: typeof actionTypes.FETCH_CONTENT_FAILURE;
  meta: { query: QueryContents };
  payload: {
    error: BlackoutError;
    hash: Hash;
  };
}

export interface ActionFetchCommercePagesRequest extends Action {
  type: typeof actionTypes.FETCH_COMMERCE_PAGES_REQUEST;
  meta: { query: QueryCommercePages };
  payload: { hash: Hash };
}

export interface ActionFetchCommercePagesSuccess extends Action {
  type: typeof actionTypes.FETCH_COMMERCE_PAGES_SUCCESS;
  meta: { query: QueryCommercePages };
  payload: {
    result: SearchResultsReducer['result'];
    hash: Hash;
  };
}

export interface ActionFetchCommercePagesFailure extends Action {
  type: typeof actionTypes.FETCH_COMMERCE_PAGES_FAILURE;
  meta: { query: QueryCommercePages };
  payload: {
    error: BlackoutError;
    hash: Hash;
  };
}

export interface ActionFetchSEORequest extends Action {
  meta: { query: QuerySEO };
  payload: { pathname: Pathname };
  type: typeof actionTypes.FETCH_SEO_REQUEST;
}

export interface ActionFetchSEOSuccess extends Action {
  meta: { query: QuerySEO };
  payload: {
    pathname: Pathname;
    result: SEOMetadata;
  };
  type: typeof actionTypes.FETCH_SEO_SUCCESS;
}

export interface ActionFetchSEOFailure extends Action {
  meta: { query: QuerySEO };
  payload: {
    error: BlackoutError;
    pathname: Pathname;
  };
  type: typeof actionTypes.FETCH_SEO_FAILURE;
}

export interface ActionFetchContentTypesRequest extends Action {
  type: typeof actionTypes.FETCH_CONTENT_TYPES_REQUEST;
}

export interface ActionFetchContentTypesSuccess extends Action {
  payload: Array<ContentTypesEntries['code']>;
  type: typeof actionTypes.FETCH_CONTENT_TYPES_SUCCESS;
}

export interface ActionFetchContentTypesFailure extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_CONTENT_TYPES_FAILURE;
}

export type ActionFetchContent =
  | ActionFetchContentRequest
  | ActionFetchContentRequestSuccess
  | ActionFetchContentRequestFailure;
export type ActionFetchCommercePages =
  | ActionFetchCommercePagesRequest
  | ActionFetchCommercePagesSuccess
  | ActionFetchCommercePagesFailure;
export type ActionFetchSEO =
  | ActionFetchSEORequest
  | ActionFetchSEOSuccess
  | ActionFetchSEOFailure;
export type ActionFetchContentTypes =
  | ActionFetchContentTypesRequest
  | ActionFetchContentTypesSuccess
  | ActionFetchContentTypesFailure;

export type CommercePagesContentNormalized = {
  number: number;
  totalPages: number;
  totalItems: number;
  entries: CommercePagesContent;
};
