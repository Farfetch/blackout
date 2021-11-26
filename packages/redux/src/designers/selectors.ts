/**
 * @module designers/selectors
 * @category Designers
 * @subcategory Selectors
 */
import { getError, getHash, getIsLoading, getResult } from './reducer';
import type { Designers } from '@farfetch/blackout-client/designers/types';
import type { Error } from '@farfetch/blackout-client/types';
import type { StoreState } from '../types';

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
 * import { getDesignersError } from '@farfetch/blackout-redux/designers';
 *
 * const mapStateToProps = state => ({
 *     error: getDesignersError(state)
 * });
 *
 */
export const getDesignersError = (
  state: StoreState,
  hash = getDesignersResultHash(state),
): Error | undefined => (hash ? getError(state.designers)[hash] : undefined);

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
 * import { areDesignersLoading } from '@farfetch/blackout-redux/designers';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areDesignersLoading(state)
 * });
 *
 */
export const areDesignersLoading = (
  state: StoreState,
  hash = getDesignersResultHash(state),
): boolean | undefined =>
  hash ? getIsLoading(state.designers)[hash] : undefined;

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
 * import { getDesignersResult } from '@farfetch/blackout-redux/designers';
 *
 * const mapStateToProps = state => ({
 * result: getDesignersResult(state, hash)
 * });
 */
export const getDesignersResult = (
  state: StoreState,
  hash = getDesignersResultHash(state),
): Designers | undefined =>
  hash ? getResult(state.designers)[hash]?.designers : undefined;

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
 * import { getDesignersResultHash } from '@farfetch/blackout-redux/designers';
 *
 * const mapStateToProps = state => ({
 *     hash: getDesignersResultHash(state)
 * });
 *
 */
export const getDesignersResultHash = (state: StoreState): string | null =>
  getHash(state.designers);

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
 * import { isDesignersResultCached } from '@farfetch/blackout-redux/designers';
 *
 * const mapStateToProps = state => ({
 *     isDesignersResultCached: isDesignersResultCached(state, hash)
 * });
 *
 */
export const isDesignersResultCached = (
  state: StoreState,
  hash: string,
): boolean => !!getDesignersResult(state, hash);
