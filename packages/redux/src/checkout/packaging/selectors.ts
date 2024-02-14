import { getPackagingOptions } from './reducer.js';
import type { PackagingOptionsState, StoreState } from '../../index.js';

/**
 * Returns the packaging options.
 *
 * @param state - Application state.
 *
 * @returns Packaging Options result.
 */
export const getPackagingOptionsResult = (state: StoreState) =>
  getPackagingOptions(state.packagingOptions as PackagingOptionsState).result;

/**
 * Returns the loading status for the packaging options operation.
 *
 * @param state - Application state.
 *
 * @returns Packaging Options operation Loading status.
 */
export const isPackagingOptionsLoading = (state: StoreState) =>
  getPackagingOptions(state.packagingOptions as PackagingOptionsState)
    .isLoading;

/**
 * Returns the error status for the packaging options operation.
 *
 * @param state - Application state.
 *
 * @returns Packaging Options operation error.
 */
export const getPackagingOptionsError = (state: StoreState) =>
  getPackagingOptions(state.packagingOptions as PackagingOptionsState).error;
