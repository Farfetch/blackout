import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  BlackoutError,
  SizeGuide,
  SizeGuidesQuery,
} from '@farfetch/blackout-client';

interface FetchSizeGuidesRequestAction extends Action {
  type: typeof actionTypes.FETCH_SIZE_GUIDES_REQUEST;
  meta: { query?: SizeGuidesQuery };
}
interface FetchSizeGuidesSuccessAction extends Action {
  type: typeof actionTypes.FETCH_SIZE_GUIDES_SUCCESS;
  payload: { result: SizeGuide[] | null };
  meta: { query?: SizeGuidesQuery };
}
interface FetchSizeGuidesFailureAction extends Action {
  type: typeof actionTypes.FETCH_SIZE_GUIDES_FAILURE;
  payload: { error: BlackoutError };
  meta: { query?: SizeGuidesQuery };
}

/**
 * Actions dispatched when the fetch size guides request is made.
 */
export type FetchSizeGuidesAction =
  | FetchSizeGuidesRequestAction
  | FetchSizeGuidesSuccessAction
  | FetchSizeGuidesFailureAction;

/**
 * Actions dispatched when the reset size guides is called.
 */
export interface ResetSizeGuidesStateAction extends Action {
  type: typeof actionTypes.RESET_SIZE_GUIDES_STATE;
}
