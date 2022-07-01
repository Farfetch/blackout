import {
  getAddressPrediction as getAddressPredictionFromReducer,
  getAddressPredictions as getAddressPredictionsFromReducer,
} from './reducer';
import type { AddressesState } from './types';
import type { StoreState } from '../types';

/**
 * Returns address predictions.
 *
 * @param state - Application state.
 *
 * @returns Predictions details.
 */
export const getAddressPredictions = (
  state: StoreState,
): AddressesState['predictions']['result'] =>
  getAddressPredictionsFromReducer(state.addresses as AddressesState).result;

/**
 * Returns address predictions error.
 *
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getAddressPredictionsError = (
  state: StoreState,
): AddressesState['predictions']['error'] =>
  getAddressPredictionsFromReducer(state.addresses as AddressesState).error;

/**
 * Returns address predictions loading status.
 *
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const areAddressPredictionsLoading = (
  state: StoreState,
): AddressesState['predictions']['isLoading'] =>
  getAddressPredictionsFromReducer(state.addresses as AddressesState).isLoading;

/**
 * Returns address prediction.
 *
 * @param state - Application state.
 *
 * @returns Predictions details.
 */
export const getAddressPrediction = (
  state: StoreState,
): AddressesState['prediction']['result'] =>
  getAddressPredictionFromReducer(state.addresses as AddressesState).result;

/**
 * Returns address prediction error.
 *
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getAddressPredictionError = (
  state: StoreState,
): AddressesState['prediction']['error'] =>
  getAddressPredictionFromReducer(state.addresses as AddressesState).error;

/**
 * Returns prediction details loading status.
 *
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const areAddressPredictionDetailsLoading = (
  state: StoreState,
): AddressesState['prediction']['isLoading'] =>
  getAddressPredictionFromReducer(state.addresses as AddressesState).isLoading;
