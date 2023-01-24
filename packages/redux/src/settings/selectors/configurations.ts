import { getEntities } from '../../entities/index.js';
import {
  getError,
  getIsLoading,
  getResult,
} from '../reducer/configurations.js';
import type { SettingsState } from '../types/index.js';
import type { StoreState } from '../../types/index.js';

/**
 * Retrieves the error status of configurations.
 *
 * @example
 * ```
 * import { getConfigurationsError } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     error: getConfigurationsError(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Error information (`null` if there are no errors).
 */
export const getConfigurationsError = (state: StoreState) =>
  getError((state.settings as SettingsState).configurations);

/**
 * Retrieves the loading state of configurations.
 *
 * @example
 * ```
 * import { areConfigurationsLoading } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areConfigurationsLoading(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - Loading status of configurations.
 */
export const areConfigurationsLoading = (state: StoreState) =>
  getIsLoading((state.settings as SettingsState).configurations);

/**
 * Returns the fetched status of configurations.
 *
 * @example
 * ```
 * import { areConfigurationsFetched } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     areConfigurationsFetched: areConfigurationsFetched(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - If configurations are fetched or not.
 */
export const areConfigurationsFetched = (state: StoreState) =>
  (!!getResult((state.settings as SettingsState).configurations) ||
    !!getConfigurationsError(state)) &&
  !areConfigurationsLoading(state);

/**
 * Retrieves a list of all the configurations available.
 *
 * @example
 * ```
 * import { getConfigurations } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     configurations: getConfigurations(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - Configurations.
 */
export const getConfigurations = (state: StoreState) =>
  getEntities(state, 'configurations');
