import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  AddressPrediction,
  AddressPredictionDetails,
  BlackoutError,
} from '@farfetch/blackout-client';

/**
 * Fetch address prediction details Action.
 */
export type FetchAddressPredictionDetailsAction =
  | FetchAddressPredictionDetailsFailureAction
  | FetchAddressPredictionDetailsRequestAction
  | FetchAddressPredictionDetailsSuccessAction;

export interface FetchAddressPredictionDetailsFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_ADDRESS_PREDICTION_DETAILS_FAILURE;
}

export interface FetchAddressPredictionDetailsRequestAction extends Action {
  type: typeof actionTypes.FETCH_ADDRESS_PREDICTION_DETAILS_REQUEST;
}

export interface FetchAddressPredictionDetailsSuccessAction extends Action {
  payload: AddressPredictionDetails;
  type: typeof actionTypes.FETCH_ADDRESS_PREDICTION_DETAILS_SUCCESS;
}

/**
 * Fetch address predictions Action.
 */
export type FetchAddressPredictionsAction =
  | FetchAddressPredictionsFailureAction
  | FetchAddressPredictionsRequestAction
  | FetchAddressPredictionsSuccessAction;

export interface FetchAddressPredictionsFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_ADDRESS_PREDICTIONS_FAILURE;
}

export interface FetchAddressPredictionsRequestAction extends Action {
  type: typeof actionTypes.FETCH_ADDRESS_PREDICTIONS_REQUEST;
}

export interface FetchAddressPredictionsSuccessAction extends Action {
  payload: AddressPrediction[];
  type: typeof actionTypes.FETCH_ADDRESS_PREDICTIONS_SUCCESS;
}

/**
 * Reset Predictions Action.
 */
export type ResetAddressPredictionsAction =
  ResetAddressPredictionsSuccessAction;

export interface ResetAddressPredictionsSuccessAction extends Action {
  type: typeof actionTypes.RESET_ADDRESS_PREDICTIONS;
}
