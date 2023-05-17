import type * as actionTypes from '../actionTypes.js';
import type { Action } from 'redux';
import type {
  BlackoutError,
  SizeScale,
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

/**
 * Actions dispatched when the reset size scales is called.
 */
export interface ResetSizeScalesStateAction extends Action {
  type: typeof actionTypes.RESET_SIZE_SCALES_STATE;
}
