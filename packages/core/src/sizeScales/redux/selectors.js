/**
 * @module sizeScales/selectors
 * @category SizeScales
 * @subcategory Selectors
 */
import { createSelector } from 'reselect';
import { generateSizeScaleMappingsHash } from './utils';
import {
  getError,
  getErrorById,
  getErrorByQuery,
  getIsLoading,
  getIsLoadingById,
  getIsLoadingByQuery,
  getMappingError,
  getMappingIsLoading,
  getMappingResult,
} from './reducer';
import {
  getSizeScale,
  getSizeScales as getSizeScaleEntities,
} from '../../entities/redux/selectors';

/**
 * Returns all size scales fetched.
 *
 * @function
 * @memberof module:sizeScales/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {object} All the size scales fetched.
 */
export const getSizeScales = state => getSizeScaleEntities(state);

/**
 * Returns a size scale.
 *
 * @function
 * @memberof module:sizeScales/selectors
 *
 * @param {object} state - Application state.
 * @param {number} scaleId - Size scale id.
 *
 * @returns {object} The size scale requested.
 */
export const getSizeScaleById = (state, scaleId) =>
  getSizeScale(state, scaleId);

/**
 * Returns a list of size scales for the provided category id.
 *
 * @function
 * @memberof module:sizeScales/selectors
 *
 * @param {object} state - Application state.
 * @param {number} categoryId - Category id.
 *
 * @returns {Array} Size scales for the provided category id.
 */
export const getSizeScalesByCategory = createSelector(
  [getSizeScales, (state, categoryId) => categoryId],
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
 * @function
 * @memberof module:sizeScales/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Size scales loading state.
 */
export const areSizeScalesLoading = state => getIsLoading(state.sizeScales);

/**
 * Returns the loading state of the size scale.
 *
 * @function
 * @memberof module:sizeScales/selectors
 *
 * @param {object} state - Application state.
 * @param {object} query - Scale query.
 * @param {number} query.categoryId - Scale id.
 *
 * @returns {boolean} The scale loading state.
 */
export const isSizeScaleLoadingByQuery = (state, query) =>
  getIsLoadingByQuery(state.sizeScales)[query.categoryId];

/**
 * Returns the loading state of the size scale.
 *
 * @function
 * @memberof module:sizeScales/selectors
 *
 * @param {object} state - Application state.
 * @param {number} scaleId - Size scale id.
 *
 * @returns {boolean} The scale loading state.
 */
export const isSizeScaleLoadingById = (state, scaleId) =>
  getIsLoadingById(state.sizeScales)[scaleId];

/**
 * Returns the error state of size scales.
 *
 * @function
 * @memberof module:sizeScales/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Size scales error state.
 */
export const getSizeScalesError = state => getError(state.sizeScales);

/**
 * Returns the error of the size scale.
 *
 * @function
 * @memberof module:sizeScales/selectors
 *
 * @param {object} state - Application state.
 * @param {object} query - Scale query.
 * @param {number} query.categoryId - Scale id.
 *
 * @returns {boolean} The scale error.
 */
export const getSizeScaleErrorByQuery = (state, query) =>
  getErrorByQuery(state.sizeScales)[query.categoryId];

/**
 * Returns the error of the size scale.
 *
 * @function
 * @memberof module:sizeScales/selectors
 *
 * @param {object} state - Application state.
 * @param {number} scaleId - Size scale id.
 *
 * @returns {boolean} The scale error.
 */
export const getSizeScaleErrorById = (state, scaleId) =>
  getErrorById(state.sizeScales)[scaleId];

/**
 * Checks if a specific size scale is fetched.
 *
 * @function
 * @memberof module:sizeScales/selectors
 *
 * @param {object} state - Application state.
 * @param {number} scaleId - Size scale id.
 *
 * @returns {boolean} If the scale was requested or not.
 */
export const isSizeScaleFetched = (state, scaleId) =>
  getIsLoadingById(state.sizeScales).hasOwnProperty(scaleId);

/**
 * Returns a specific size scale mapping error.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {object} query - Query identifying the size scale mapping request.
 *
 * @returns {object} Size scale mapping error.
 *
 * @example
 * import { getSizeScaleMappingError } from '@farfetch/blackout-core/sizeScales/redux';
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
 */
export const getSizeScaleMappingError = (state, query) =>
  getMappingError(state.sizeScales)[generateSizeScaleMappingsHash(query)];

/**
 * Returns the loading status of specific size scale mapping.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {object} query - Query identifying the size scale mapping request.
 *
 * @returns {object} Size scale mapping loading status.
 *
 * @example
 * import { isSizeScaleMappingLoading } from '@farfetch/blackout-core/sizeScales/redux';
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
 */
export const isSizeScaleMappingLoading = (state, query) =>
  getMappingIsLoading(state.sizeScales)[generateSizeScaleMappingsHash(query)];

/**
 * Returns a specific size scale mapping.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {object} query - Query identifying the size scale mapping request.
 *
 * @returns {object} Size scale mapping result.
 *
 * @example
 * import { getSizeScaleMapping } from '@farfetch/blackout-core/sizeScales/redux';
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
 */
export const getSizeScaleMapping = (state, query) =>
  getMappingResult(state.sizeScales)[generateSizeScaleMappingsHash(query)];
