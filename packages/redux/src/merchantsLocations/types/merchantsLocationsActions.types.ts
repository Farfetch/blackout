import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  BlackoutError,
  MerchantLocation,
} from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';

export interface FetchMerchantsLocationsRequestAction extends Action {
  type: typeof actionTypes.FETCH_MERCHANTS_LOCATIONS_REQUEST;
}
export interface FetchMerchantsLocationsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_MERCHANTS_LOCATIONS_SUCCESS;
  payload: NormalizedSchema<
    { merchantsLocations: Record<MerchantLocation['id'], MerchantLocation> },
    MerchantLocation['id'][]
  >;
}
export interface FetchMerchantsLocationsFailureAction extends Action {
  type: typeof actionTypes.FETCH_MERCHANTS_LOCATIONS_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch merchants locations request is made.
 */
export type FetchMerchantsLocationsAction =
  | FetchMerchantsLocationsRequestAction
  | FetchMerchantsLocationsSuccessAction
  | FetchMerchantsLocationsFailureAction;

/**
 * Actions dispatched when the reset merchants locations state is called.
 */
export interface ResetMerchantsLocationsStateAction extends Action {
  type: typeof actionTypes.RESET_MERCHANTS_LOCATIONS_STATE;
}
