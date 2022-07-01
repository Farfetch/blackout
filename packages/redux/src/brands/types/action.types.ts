import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  BlackoutError,
  Brand,
  BrandsQuery,
} from '@farfetch/blackout-client';
import type { BrandsResultNormalized } from './state.types';
import type { NormalizedSchema } from 'normalizr';

type BrandsMeta = {
  hash: string;
  query?: BrandsQuery;
};

// A single brand normalized is
// ```
// result: 4224
// ```
type BrandNormalized = NormalizedSchema<
  { brands: Record<Brand['id'], Brand> },
  Brand['id']
>;

// Multiple brands normalized are
// ```
// result: {
//   number: 1,
//   totalPages: 1,
//   totalItems: 28,
//   entries: [4224, 34624, 47449, 3440, 25354, 10533]
// }
// ```
type BrandsNormalized = NormalizedSchema<
  { brands: Record<Brand['id'], Brand> },
  BrandsResultNormalized
>;

//
// Misc
//
export interface ResetBrandsStateAction extends Action {
  type: typeof actionTypes.RESET_BRANDS_STATE;
}

export interface SetBrandsHashAction extends Action {
  meta: BrandsMeta;
  type: typeof actionTypes.SET_BRANDS_HASH;
}

//
// Fetch brand - single
//
export interface FetchBrandFailureAction extends Action {
  meta: { brandId: Brand['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_BRAND_FAILURE;
}

export interface FetchBrandRequestAction extends Action {
  meta: { brandId: Brand['id'] };
  type: typeof actionTypes.FETCH_BRAND_REQUEST;
}

export interface FetchBrandSuccessAction extends Action {
  meta: { brandId: Brand['id'] };
  payload: BrandNormalized;
  type: typeof actionTypes.FETCH_BRAND_SUCCESS;
}

export type FetchBrandAction =
  | FetchBrandFailureAction
  | FetchBrandRequestAction
  | FetchBrandSuccessAction;

//
// Fetch brands - multiple
//
export interface FetchBrandsFailureAction extends Action {
  meta: BrandsMeta;
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_BRANDS_FAILURE;
}

export interface FetchBrandsRequestAction extends Action {
  meta: BrandsMeta;
  type: typeof actionTypes.FETCH_BRANDS_REQUEST;
}

export interface FetchBrandsSuccessAction extends Action {
  meta: BrandsMeta;
  payload: BrandsNormalized;
  type: typeof actionTypes.FETCH_BRANDS_SUCCESS;
}

export type FetchBrandsAction =
  | FetchBrandsFailureAction
  | FetchBrandsRequestAction
  | FetchBrandsSuccessAction
  | ResetBrandsStateAction
  | SetBrandsHashAction;
