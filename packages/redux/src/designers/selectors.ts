import { getError, getHash, getIsLoading, getResult } from './reducer';
import type { Designers } from '@farfetch/blackout-client/designers/types';
import type { Error } from '@farfetch/blackout-client/types';
import type { StoreState } from '../types';

/**
 * Returns the designers error.
 *
 * @example
 * ```
 * import { getDesignersError } from '@farfetch/blackout-redux/designers';
 *
 * const mapStateToProps = state => ({
 *     error: getDesignersError(state)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param hash  - Designer result identifier composed by subfolder and query.
 *
 * @returns Designers error.
 */
export const getDesignersError = (
  state: StoreState,
  hash = getDesignersResultHash(state),
): Error | undefined => (hash ? getError(state.designers)[hash] : undefined);

/**
 * Returns the loading status for the designers.
 *
 * @example
 * ```
 * import { areDesignersLoading } from '@farfetch/blackout-redux/designers';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areDesignersLoading(state)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param hash  - Designer result identifier composed by subfolder and query.
 *
 * @returns Loading status.
 */
export const areDesignersLoading = (
  state: StoreState,
  hash = getDesignersResultHash(state),
): boolean | undefined =>
  hash ? getIsLoading(state.designers)[hash] : undefined;

/**
 * Returns the designers.
 *
 * @example
 * ```
 * import { getDesignersResult } from '@farfetch/blackout-redux/designers';
 *
 * const mapStateToProps = state => ({
 * result: getDesignersResult(state, hash)
 * });
 * ```
 *
 * @param state - Application state.
 * @param hash  - Designer result identifier composed by subfolder and query.
 *
 * @returns Designers.
 */
export const getDesignersResult = (
  state: StoreState,
  hash = getDesignersResultHash(state),
): Designers | undefined =>
  hash ? getResult(state.designers)[hash]?.designers : undefined;

/**
 * Retrieves the current designer result hash.
 *
 * @example
 * ```
 * import { getDesignersResultHash } from '@farfetch/blackout-redux/designers';
 *
 * const mapStateToProps = state => ({
 *     hash: getDesignersResultHash(state)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns - Designers result identifier composed by subfolder and query.
 */
export const getDesignersResultHash = (state: StoreState): string | null =>
  getHash(state.designers);

/**
 * Retrieves if a designers result is cached by its hash.
 *
 * @example
 * ```
 * import { isDesignersResultCached } from '@farfetch/blackout-redux/designers';
 *
 * const mapStateToProps = state => ({
 *     isDesignersResultCached: isDesignersResultCached(state, hash)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param hash  - Designer result identifier composed by subfolder and query.
 *
 * @returns - Whether the designers result is cached or not.
 */
export const isDesignersResultCached = (
  state: StoreState,
  hash: string,
): boolean => !!getDesignersResult(state, hash);
