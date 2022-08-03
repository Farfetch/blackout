import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  BlackoutError,
  ContentType,
  QueryCommercePages,
  QuerySearchContents,
  QuerySEO,
  SEOMetadata,
} from '@farfetch/blackout-client';
import type { Hash, Pathname, SearchResultsState } from '../types';

export interface ActionFetchContentsRequest extends Action {
  type: typeof actionTypes.FETCH_CONTENTS_REQUEST;
  meta: { query: QuerySearchContents };
  payload: { hash: Hash };
}

export interface ActionFetchContentsRequestSuccess extends Action {
  type: typeof actionTypes.FETCH_CONTENTS_SUCCESS;
  meta: { query: QuerySearchContents };
  payload: {
    result: SearchResultsState['result'];
    hash: Hash;
  };
}

export interface ActionFetchContentsRequestFailure extends Action {
  type: typeof actionTypes.FETCH_CONTENTS_FAILURE;
  meta: { query: QuerySearchContents };
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
    result: SearchResultsState['result'];
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
  payload: Array<ContentType['code']>;
  type: typeof actionTypes.FETCH_CONTENT_TYPES_SUCCESS;
}

export interface ActionFetchContentTypesFailure extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_CONTENT_TYPES_FAILURE;
}

export type ActionFetchContents =
  | ActionFetchContentsRequest
  | ActionFetchContentsRequestSuccess
  | ActionFetchContentsRequestFailure;
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
