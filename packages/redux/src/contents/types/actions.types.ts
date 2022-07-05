import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client/types';
import type {
  CommercePagesContent,
  ContentPagesContent,
  ContentTypesEntries,
  QueryContentPages,
  QueryContents,
  QuerySEO,
} from '@farfetch/blackout-client/contents/types';
import type { Hash, Pathname, SearchResultsReducer } from '../types';
import type { MetadataReducer } from './reducers.types';

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
  meta: { query: QueryContents };
  payload: { hash: Hash };
}

export interface ActionFetchCommercePagesSuccess extends Action {
  type: typeof actionTypes.FETCH_COMMERCE_PAGES_SUCCESS;
  meta: { query: QueryContents };
  payload: {
    result: SearchResultsReducer['result'];
    hash: Hash;
  };
}

export interface ActionFetchCommercePagesFailure extends Action {
  type: typeof actionTypes.FETCH_COMMERCE_PAGES_FAILURE;
  meta: { query: QueryContents };
  payload: {
    error: BlackoutError;
    hash: Hash;
  };
}

export interface ActionFetchContentPagesRequest extends Action {
  type: typeof actionTypes.FETCH_CONTENT_PAGES_REQUEST;
  meta: { query: QueryContentPages };
  payload: { hash: Hash };
}

export interface ActionFetchContentPagesSuccess extends Action {
  type: typeof actionTypes.FETCH_CONTENT_PAGES_SUCCESS;
  meta: { query: QueryContentPages };
  payload: {
    result: SearchResultsReducer['result'];
    hash: Hash;
  };
}

export interface ActionFetchContentPagesFailure extends Action {
  type: typeof actionTypes.FETCH_CONTENT_PAGES_FAILURE;
  meta: { query: QueryContentPages };
  payload: {
    error: Error;
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
    result: MetadataReducer['result'];
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
export type ActionFetchContentPages =
  | ActionFetchContentPagesRequest
  | ActionFetchContentPagesSuccess
  | ActionFetchContentPagesFailure;
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

export type ContentPagesContentNormalized = {
  number: number;
  totalPages: number;
  totalItems: number;
  entries: ContentPagesContent;
};
