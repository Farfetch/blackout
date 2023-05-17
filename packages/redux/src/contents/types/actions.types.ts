import type * as actionTypes from '../actionTypes.js';
import type { Action } from 'redux';
import type {
  BlackoutError,
  Contents,
  ContentType,
  SEOMetadata,
} from '@farfetch/blackout-client';
import type { ContentEntity } from '../../entities/index.js';
import type { Hash, Pathname } from './reducers.types.js';
import type { NormalizedSchema } from 'normalizr';

export type ContentsNormalized = Omit<Contents, 'entries'> & {
  entries: ContentEntity['publicationId'];
  hash: Hash;
};

export type ContentsPayload = NormalizedSchema<
  {
    contents: Record<ContentEntity['publicationId'], ContentEntity>;
  },
  ContentsNormalized
> & { hash: Hash };

/**
 * Fetch Content Page Action
 */
export type FetchContentPageAction =
  | FetchContentPageFailureAction
  | FetchContentPageRequestAction
  | FetchContentPageSuccessAction;

export interface FetchContentPageFailureAction extends Action {
  payload: { error: BlackoutError; hash: Hash };
  type: typeof actionTypes.FETCH_CONTENT_PAGES_FAILURE;
}

export interface FetchContentPageRequestAction extends Action {
  payload: { hash: Hash };
  type: typeof actionTypes.FETCH_CONTENT_PAGE_REQUEST;
}

export interface FetchContentPageSuccessAction extends Action {
  payload: ContentsPayload;
  type: typeof actionTypes.FETCH_CONTENT_PAGES_SUCCESS;
}

/**
 * Fetch Contents Action
 */
export type FetchContentsAction =
  | FetchContentsRequestAction
  | FetchContentsSuccessAction
  | FetchContentsFailureAction;

export interface FetchContentsRequestAction extends Action {
  type: typeof actionTypes.FETCH_CONTENTS_REQUEST;
  payload: { hash: Hash };
}

export interface FetchContentsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_CONTENTS_SUCCESS;
  payload: ContentsPayload;
}

export interface FetchContentsFailureAction extends Action {
  type: typeof actionTypes.FETCH_CONTENTS_FAILURE;
  payload: { error: BlackoutError; hash: Hash };
}

/**
 * Fetch Commerce Pages Action
 */
export type FetchCommercePagesAction =
  | FetchCommercePagesRequestAction
  | FetchCommercePagesSuccessAction
  | FetchCommercePagesFailureAction;

export interface FetchCommercePagesRequestAction extends Action {
  type: typeof actionTypes.FETCH_COMMERCE_PAGES_REQUEST;
  payload: { hash: Hash };
}

export interface FetchCommercePagesSuccessAction extends Action {
  type: typeof actionTypes.FETCH_COMMERCE_PAGES_SUCCESS;
  payload: ContentsPayload;
}

export interface FetchCommercePagesFailureAction extends Action {
  type: typeof actionTypes.FETCH_COMMERCE_PAGES_FAILURE;
  payload: { error: BlackoutError; hash: Hash };
}

/**
 * Fetch SEO Metadata Action
 */
export type FetchSEOMetadataAction =
  | FetchSEOMetadataRequestAction
  | FetchSEOMetadataSuccessAction
  | FetchSEOMetadataFailureAction;

export interface FetchSEOMetadataRequestAction extends Action {
  payload: { pathname: Pathname };
  type: typeof actionTypes.FETCH_SEO_METADATA_REQUEST;
}

export interface FetchSEOMetadataSuccessAction extends Action {
  payload: {
    pathname: Pathname;
    result: SEOMetadata;
  };
  type: typeof actionTypes.FETCH_SEO_METADATA_SUCCESS;
}

export interface FetchSEOMetadataFailureAction extends Action {
  payload: {
    error: BlackoutError;
    pathname: Pathname;
  };
  type: typeof actionTypes.FETCH_SEO_METADATA_FAILURE;
}

/**
 * Fetch Content Types Action
 */
export type FetchContentTypesAction =
  | FetchContentTypesRequestAction
  | FetchContentTypesSuccessAction
  | FetchContentTypesFailureAction;

export interface FetchContentTypesRequestAction extends Action {
  type: typeof actionTypes.FETCH_CONTENT_TYPES_REQUEST;
}

export interface FetchContentTypesSuccessAction extends Action {
  payload: Array<ContentType['code']>;
  type: typeof actionTypes.FETCH_CONTENT_TYPES_SUCCESS;
}

export interface FetchContentTypesFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_CONTENT_TYPES_FAILURE;
}
