import {
  getError as errorGetter,
  getIsLoading,
  getAddressPrediction as predictionGetter,
  getAddressPredictions as predictionsGetter,
} from './reducer';
import type { State } from './types';
import type { StoreState } from '../types';

/**
 * Returns the error of the addresses area.
 *
 * @param state - Application state.
 *
 * @returns Address information object.
 */
export const getAddressesError = (state: StoreState): State['error'] =>
  errorGetter(state.addresses);

/**
 * Returns the loading status of the addresses area.
 *
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const isAddressesLoading = (state: StoreState): State['isLoading'] =>
  getIsLoading(state.addresses);

/**
 * Returns the error or loading status of each sub-area.
 */

/**
 * @param state - Application state.
 *
 * @returns Predictions details.
 */
export const getAddressPredictions = (
  state: StoreState,
): State['predictions']['result'] => predictionsGetter(state.addresses).result;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getAddressPredictionsError = (
  state: StoreState,
): State['predictions']['error'] => predictionsGetter(state.addresses).error;

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const isAddressPredictionsLoading = (
  state: StoreState,
): State['predictions']['isLoading'] =>
  predictionsGetter(state.addresses).isLoading;

/**
 * @param state - Application state.
 *
 * @returns Predictions details.
 */
export const getAddressPrediction = (
  state: StoreState,
): State['prediction']['result'] => predictionGetter(state.addresses).result;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getAddressPredictionError = (
  state: StoreState,
): State['prediction']['error'] => predictionGetter(state.addresses).error;

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const isAddressPredictionLoading = (
  state: StoreState,
): State['prediction']['isLoading'] =>
  predictionGetter(state.addresses).isLoading;
