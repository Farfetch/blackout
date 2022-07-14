import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  AddressPrediction,
  AddressPredictions,
} from '@farfetch/blackout-client/src/addresses/types';
import type { BlackoutError } from '@farfetch/blackout-client';

/**
 * Fetch address prediction details Action.
 */
export type FetchAddressPredictionAction =
  | FetchAddressPredictionFailureAction
  | FetchAddressPredictionRequestAction
  | FetchAddressPredictionSuccessAction;

export interface FetchAddressPredictionFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_ADDRESS_PREDICTION_FAILURE;
}

export interface FetchAddressPredictionRequestAction extends Action {
  type: typeof actionTypes.FETCH_ADDRESS_PREDICTION_REQUEST;
}

export interface FetchAddressPredictionSuccessAction extends Action {
  payload: AddressPrediction;
  type: typeof actionTypes.FETCH_ADDRESS_PREDICTION_SUCCESS;
}

/**
 * Fetch address prediction Action.
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
  payload: AddressPredictions[];
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
