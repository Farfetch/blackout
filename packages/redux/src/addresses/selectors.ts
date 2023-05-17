import {
  getAddressPrediction as getAddressPredictionFromReducer,
  getAddressPredictions as getAddressPredictionsFromReducer,
} from './reducer.js';
import type { AddressesState } from './types/index.js';
import type { StoreState } from '../types/index.js';

/**
 * Returns address predictions.
 *
 * @param state - Application state.
 *
 * @returns Predictions details.
 */
export const getAddressPredictions = (state: StoreState) =>
  getAddressPredictionsFromReducer(state.addresses as AddressesState).result;

/**
 * Returns address predictions error.
 *
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getAddressPredictionsError = (state: StoreState) =>
  getAddressPredictionsFromReducer(state.addresses as AddressesState).error;

/**
 * Returns address predictions loading status.
 *
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const areAddressPredictionsLoading = (state: StoreState) =>
  getAddressPredictionsFromReducer(state.addresses as AddressesState).isLoading;

/**
 * Returns address prediction.
 *
 * @param state - Application state.
 *
 * @returns Predictions details.
 */
export const getAddressPrediction = (state: StoreState) =>
  getAddressPredictionFromReducer(state.addresses as AddressesState).result;

/**
 * Returns address prediction error.
 *
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getAddressPredictionError = (state: StoreState) =>
  getAddressPredictionFromReducer(state.addresses as AddressesState).error;

/**
 * Returns prediction details loading status.
 *
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const areAddressPredictionDetailsLoading = (state: StoreState) =>
  getAddressPredictionFromReducer(state.addresses as AddressesState).isLoading;
