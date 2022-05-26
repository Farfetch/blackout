import { createSelector } from 'reselect';
import { generateSizeScaleMappingsHash } from './utils';
import {
  getError,
  getIsLoading,
  getMappingError,
  getMappingIsLoading,
  getMappingResult,
  getSizeScaleError as getSizeScaleErrorByIdentifier,
  getSizeScaleIsLoading as getSizeScaleIsLoadingByIdentifier,
} from './reducer';
import { getSizeScales } from '../entities/selectors';
import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { Category } from '@farfetch/blackout-client/categories/types';
import type {
  SizeScale,
  SizeScaleMapping,
  SizeScaleMappingsQuery,
  SizeScalesQuery,
} from '@farfetch/blackout-client/sizeScales/types';
import type { StoreState } from '../types';

/**
 * Returns a list of size scales for the provided category id.
 *
 * @param state      - Application state.
 * @param categoryId - Category id.
 *
 * @returns Size scales for the provided category id.
 */
export const getSizeScalesByCategory = createSelector(
  [
    getSizeScales,
    (state: StoreState, categoryId: Category['id']) => categoryId,
  ],
  (scales, categoryId) => {
    if (scales) {
      return Object.values(scales).filter(
        scale => scale.categoryId === categoryId,
      );
    }

    return [];
  },
);

/**
 * Returns the loading state of size scales.
 *
 * @param state - Application state.
 *
 * @returns Size scales loading state.
 */
export const areSizeScalesLoading = (state: StoreState): boolean =>
  getIsLoading(state.sizeScales);

/**
 * Returns the loading state of the size scale.
 *
 * @param state           - Application state.
 * @param scaleIdentifier - Size scale id or the query object used to fetch the size scale.
 *
 * @returns The scale loading state.
 */
export const isSizeScaleLoading = (
  state: StoreState,
  scaleIdentifier: SizeScale['sizeScaleId'] | SizeScalesQuery,
): boolean | undefined => {
  let identifier;

  if (typeof scaleIdentifier === 'object') {
    identifier = `categoryId_${scaleIdentifier.categoryId}`;
  } else {
    identifier = scaleIdentifier;
  }

  return getSizeScaleIsLoadingByIdentifier(state.sizeScales)[identifier];
};

/**
 * Returns the error state of size scales.
 *
 * @param state - Application state.
 *
 * @returns Size scales error state.
 */
export const getSizeScalesError = (state: StoreState): BlackoutError | null =>
  getError(state.sizeScales);

/**
 * Returns the error of the size scale.
 *
 * @param state           - Application state.
 * @param scaleIdentifier - Size scale id or the query object used to fetch the size scale.
 *
 * @returns The scale error.
 */
export const getSizeScaleError = (
  state: StoreState,
  scaleIdentifier: number | SizeScalesQuery,
): BlackoutError | undefined => {
  let identifier;

  if (typeof scaleIdentifier === 'object') {
    identifier = `categoryId_${scaleIdentifier.categoryId}`;
  } else {
    identifier = scaleIdentifier;
  }

  return getSizeScaleErrorByIdentifier(state.sizeScales)[identifier];
};

/**
 * Checks if a specific size scale is fetched.
 *
 * @param state   - Application state.
 * @param scaleId - Size scale id.
 *
 * @returns If the scale was requested or not.
 */
export const isSizeScaleFetched = (
  state: StoreState,
  scaleId: SizeScale['sizeScaleId'],
): boolean =>
  getSizeScaleIsLoadingByIdentifier(state.sizeScales).hasOwnProperty(scaleId);

/**
 * Returns a specific size scale mapping error.
 *
 * @example
 * ```
 * import { getSizeScaleMappingError } from '@farfetch/blackout-client/sizeScales/redux';
 *
 * const query = {
 *   gender: 0,
 *   sizeScale: 453,
 *   brand: 1664,
 * };
 * const mapStateToProps = state => ({
 *   error: getSizeScaleMappingError(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Query identifying the size scale mapping request.
 *
 * @returns Size scale mapping error.
 */
export const getSizeScaleMappingError = (
  state: StoreState,
  query: SizeScaleMappingsQuery,
): BlackoutError | undefined =>
  getMappingError(state.sizeScales)[generateSizeScaleMappingsHash(query)];

/**
 * Returns the loading status of specific size scale mapping.
 *
 * @example
 * ```
 * import { isSizeScaleMappingLoading } from '@farfetch/blackout-client/sizeScales/redux';
 *
 * const query = {
 *   gender: 0,
 *   sizeScale: 453,
 *   brand: 1664,
 * };
 * const mapStateToProps = state => ({
 *   isLoading: isSizeScaleMappingLoading(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Query identifying the size scale mapping request.
 *
 * @returns Size scale mapping loading status.
 */
export const isSizeScaleMappingLoading = (
  state: StoreState,
  query: SizeScaleMappingsQuery,
): boolean | undefined =>
  getMappingIsLoading(state.sizeScales)[generateSizeScaleMappingsHash(query)];

/**
 * Returns a specific size scale mapping.
 *
 * @example
 * ```
 * import { getSizeScaleMapping } from '@farfetch/blackout-client/sizeScales/redux';
 *
 * const query = {
 *   gender: 0,
 *   sizeScale: 453,
 *   brand: 1664,
 * };
 * const mapStateToProps = state => ({
 *   sizeScaleMapping: getSizeScaleMapping(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Query identifying the size scale mapping request.
 *
 * @returns Size scale mapping result.
 */
export const getSizeScaleMapping = (
  state: StoreState,
  query: SizeScaleMappingsQuery,
): SizeScaleMapping | undefined =>
  getMappingResult(state.sizeScales)[generateSizeScaleMappingsHash(query)];
