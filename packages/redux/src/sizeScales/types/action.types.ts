import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  BlackoutError,
  SizeScale,
  SizeScaleMapping,
  SizeScaleMappingsQuery,
  SizeScalesQuery,
} from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';

type Payload = NormalizedSchema<
  { sizeScales: Record<SizeScale['sizeScaleId'], SizeScale> },
  SizeScale['sizeScaleId'] | Array<SizeScale['sizeScaleId']>
>;

interface FetchSizeScaleFailureAction extends Action {
  meta: { sizeScaleId: SizeScale['sizeScaleId'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_SIZE_SCALE_FAILURE;
}
interface FetchSizeScaleSuccessAction extends Action {
  meta: { sizeScaleId: SizeScale['sizeScaleId'] };
  payload: Payload;
  type: typeof actionTypes.FETCH_SIZE_SCALE_SUCCESS;
}
interface FetchSizeScaleRequestAction extends Action {
  meta: { sizeScaleId: SizeScale['sizeScaleId'] };
  type: typeof actionTypes.FETCH_SIZE_SCALE_REQUEST;
}

/**
 * Actions dispatched when the fetch size scale request is made.
 */
export type FetchSizeScaleAction =
  | FetchSizeScaleRequestAction
  | FetchSizeScaleSuccessAction
  | FetchSizeScaleFailureAction;

interface FetchSizeScalesRequestAction extends Action {
  meta: { query: SizeScalesQuery };
  type: typeof actionTypes.FETCH_SIZE_SCALES_REQUEST;
}
interface FetchSizeScalesSuccessAction extends Action {
  meta: { query: SizeScalesQuery };
  payload: Payload;
  type: typeof actionTypes.FETCH_SIZE_SCALES_SUCCESS;
}
interface FetchSizeScalesFailureAction extends Action {
  meta: { query: SizeScalesQuery };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_SIZE_SCALES_FAILURE;
}

/**
 * Actions dispatched when the fetch size scales request is made.
 */
export type FetchSizeScalesAction =
  | FetchSizeScalesRequestAction
  | FetchSizeScalesSuccessAction
  | FetchSizeScalesFailureAction;

interface FetchSizeScaleMappingsRequestAction extends Action {
  meta: { hash: string; query: SizeScaleMappingsQuery };
  type: typeof actionTypes.FETCH_SIZESCALE_MAPPINGS_REQUEST;
}
interface FetchSizeScaleMappingsSuccessAction extends Action {
  meta: { hash: string; query: SizeScaleMappingsQuery };
  payload: { result: SizeScaleMapping };
  type: typeof actionTypes.FETCH_SIZESCALE_MAPPINGS_SUCCESS;
}
interface FetchSizeScaleMappingsFailureAction extends Action {
  meta: { hash: string; query: SizeScaleMappingsQuery };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_SIZESCALE_MAPPINGS_FAILURE;
}

/**
 * Actions dispatched when the fetch size scale mappings request is made.
 */
export type FetchSizeScaleMappingsAction =
  | FetchSizeScaleMappingsRequestAction
  | FetchSizeScaleMappingsSuccessAction
  | FetchSizeScaleMappingsFailureAction;

/**
 * Actions dispatched when the reset size scales is called.
 */
export interface ResetSizeScalesStateAction extends Action {
  type: typeof actionTypes.RESET_SIZE_SCALES_STATE;
}
