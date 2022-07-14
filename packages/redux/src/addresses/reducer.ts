import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { LOGOUT_SUCCESS } from '@farfetch/blackout-redux/src/authentication/actionTypes';
import type * as T from './types';
import type {
  AddressPrediction,
  AddressPredictions,
} from '@farfetch/blackout-client/src/addresses/types';
import type {
  ReducerSwitch,
  StateWithResult,
  StateWithResultArray,
} from '../types';

export const INITIAL_STATE: T.State = {
  error: null,
  isLoading: false,
  predictions: {
    result: null,
    error: null,
    isLoading: false,
  },
  prediction: {
    result: null,
    error: null,
    isLoading: false,
  },
};

const error = (
  state = INITIAL_STATE.error,
  action:
    | T.FetchAddressPredictionsFailureAction
    | T.FetchAddressPredictionsRequestAction
    | T.FetchAddressPredictionFailureAction
    | T.FetchAddressPredictionRequestAction,
): T.State['error'] => {
  switch (action.type) {
    case actionTypes.FETCH_ADDRESS_PREDICTIONS_FAILURE:
    case actionTypes.FETCH_ADDRESS_PREDICTION_FAILURE:
      return action.payload.error;
    case actionTypes.FETCH_ADDRESS_PREDICTIONS_REQUEST:
    case actionTypes.FETCH_ADDRESS_PREDICTION_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: T.FetchAddressPredictionsAction | T.FetchAddressPredictionAction,
): T.State['isLoading'] => {
  switch (action.type) {
    case actionTypes.FETCH_ADDRESS_PREDICTIONS_REQUEST:
    case actionTypes.FETCH_ADDRESS_PREDICTION_REQUEST:
      return true;
    case actionTypes.FETCH_ADDRESS_PREDICTIONS_FAILURE:
    case actionTypes.FETCH_ADDRESS_PREDICTIONS_SUCCESS:
    case actionTypes.FETCH_ADDRESS_PREDICTION_FAILURE:
    case actionTypes.FETCH_ADDRESS_PREDICTION_SUCCESS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const predictions = (
  state = INITIAL_STATE.predictions,
  action:
    | T.FetchAddressPredictionsAction
    | T.ResetAddressPredictionsSuccessAction,
): StateWithResultArray<AddressPredictions> => {
  switch (action.type) {
    case actionTypes.FETCH_ADDRESS_PREDICTIONS_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.predictions.error,
        isLoading: true,
      };
    case actionTypes.FETCH_ADDRESS_PREDICTIONS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.FETCH_ADDRESS_PREDICTIONS_SUCCESS:
      return {
        error: INITIAL_STATE.predictions.error,
        isLoading: false,
        result: action.payload,
      };
    case actionTypes.RESET_ADDRESS_PREDICTIONS:
      return INITIAL_STATE.predictions;
    default:
      return state;
  }
};

const prediction = (
  state = INITIAL_STATE.prediction,
  action:
    | T.FetchAddressPredictionAction
    | T.ResetAddressPredictionsSuccessAction,
): StateWithResult<AddressPrediction> => {
  switch (action.type) {
    case actionTypes.FETCH_ADDRESS_PREDICTION_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.prediction.error,
        isLoading: true,
      };
    case actionTypes.FETCH_ADDRESS_PREDICTION_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.FETCH_ADDRESS_PREDICTION_SUCCESS:
      return {
        error: INITIAL_STATE.prediction.error,
        isLoading: false,
        result: action.payload,
      };
    case actionTypes.RESET_ADDRESS_PREDICTIONS:
      return INITIAL_STATE.prediction;
    default:
      return state;
  }
};

export const getError = (state: T.State): T.State['error'] => state.error;
export const getIsLoading = (state: T.State): T.State['isLoading'] =>
  state.isLoading;
export const getAddressPredictions = (state: T.State): T.State['predictions'] =>
  state.predictions;
export const getAddressPrediction = (state: T.State): T.State['prediction'] =>
  state.prediction;

const reducer = combineReducers({
  error,
  isLoading,
  predictions,
  prediction,
});

/**
 * Reducer for addresses state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const addressesReducer: ReducerSwitch<T.State> = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default addressesReducer;
