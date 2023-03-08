import * as actionTypes from './actionTypes.js';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import {
  FETCH_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from '../users/authentication/actionTypes.js';
import type * as T from './types/index.js';

export const INITIAL_STATE: T.AddressesState = {
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

const predictions = (
  state = INITIAL_STATE.predictions,
  action: AnyAction,
): T.AddressesState['predictions'] => {
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
    default:
      return state;
  }
};

const prediction = (
  state = INITIAL_STATE.prediction,
  action: AnyAction,
): T.AddressesState['prediction'] => {
  switch (action.type) {
    case actionTypes.FETCH_ADDRESS_PREDICTION_DETAILS_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.prediction.error,
        isLoading: true,
      };
    case actionTypes.FETCH_ADDRESS_PREDICTION_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.FETCH_ADDRESS_PREDICTION_DETAILS_SUCCESS:
      return {
        error: INITIAL_STATE.prediction.error,
        isLoading: false,
        result: action.payload,
      };
    default:
      return state;
  }
};

export const getAddressPredictions = (
  state: T.AddressesState,
): T.AddressesState['predictions'] => state.predictions;
export const getAddressPrediction = (
  state: T.AddressesState,
): T.AddressesState['prediction'] => state.prediction;

const reducer = combineReducers({
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
const addressesReducer: Reducer<T.AddressesState> = (state, action) => {
  if (
    action.type === LOGOUT_SUCCESS ||
    action.type === LOGIN_SUCCESS ||
    action.type === REGISTER_SUCCESS ||
    action.type === FETCH_USER_SUCCESS ||
    action.type === actionTypes.RESET_ADDRESS_PREDICTIONS
  ) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default addressesReducer;
