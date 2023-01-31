/**
 * @module designers/selectors
 * @category Designers
 * @subcategory Selectors
 */
import { getEntity } from '../../entities/redux/selectors';
import { getError, getHash, getIsLoading } from './reducer';
import get from 'lodash/get';

/**
 * Retrieves the current designer result hash.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {string} - Designers result identifier composed by subfolder and query.
 *
 * @example
 * import { getDesignerResultHash } from '@farfetch/blackout-core/designers/redux';
 *
 * const mapStateToProps = state => ({
 *     hash: getDesignerResultHash(state)
 * });
 *
 */
export const getDesignerResultHash = state => getHash(state.designers);

/**
 * Returns the designers error.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} hash - Designer result identifier composed by subfolder and query.
 *
 * @returns {object} Designers error.
 *
 * @example
 * import { getDesignersError } from '@farfetch/blackout-core/designers/redux';
 *
 * const mapStateToProps = state => ({
 *     error: getDesignersError(state)
 * });
 *
 */
export const getDesignersError = (state, hash = getDesignerResultHash(state)) =>
  getError(state.designers)[hash];

/**
 * Returns the loading status for the designers.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} hash - Designer result identifier composed by subfolder and query.
 *
 * @returns {boolean} Loading status.
 *
 * @example
 * import { areDesignersLoading } from '@farfetch/blackout-core/designers/redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areDesignersLoading(state)
 * });
 *
 */
export const areDesignersLoading = (
  state,
  hash = getDesignerResultHash(state),
) => getIsLoading(state.designers)[hash];

/**
 * Returns the designers.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} hash - Designer result identifier composed by subfolder and query.
 *
 * @returns {Array} Designers.
 * @example
 * import { getDesignersResult } from '@farfetch/blackout-core/designers/redux';
 *
 * const mapStateToProps = state => ({
 * result: getDesignersResult(state, hash)
 * });
 */
export const getDesignersResult = (
  state,
  hash = getDesignerResultHash(state),
) => get(getEntity(state, 'designerResults', hash), 'designers');

/**
 * Retrieves if a designers result is cached by its hash.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} hash - Designer result identifier composed by subfolder and query.
 *
 * @returns {boolean} - Whether the designers result is cached or not.
 *
 * @example
 * import { isDesignerResultInCache } from '@farfetch/blackout-core/designers/redux';
 *
 * const mapStateToProps = state => ({
 *     isDesignerResultInCache: isDesignerResultInCache(state, hash)
 * });
 *
 */
export const isDesignerResultInCache = (state, hash) =>
  !!getDesignersResult(state, hash);
