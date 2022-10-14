import { getEntityById } from '../../entities';
import { getError, getIsLoading } from '../reducer/configuration';
import type { Configuration } from '@farfetch/blackout-client';
import type { SettingsState } from '../types';
import type { StoreState } from '../../types';

/**
 * Retrieves the error status of a configuration by its code.
 *
 * @param state - Application state.
 *
 * @returns Error information (`null` if there are no errors).
 */
export const getConfigurationError = (
  state: StoreState,
  configurationCode: Configuration['code'],
) =>
  getError((state.settings as SettingsState).configurations.configuration)[
    configurationCode
  ];

/**
 * Retrieves the loading state of a configuration by its code.
 *
 * @param state - Application state.
 * @param configurationCode - Configuration code.
 *
 * @returns - Loading status of configuration.
 */
export const isConfigurationLoading = (
  state: StoreState,
  configurationCode: Configuration['code'],
) =>
  getIsLoading((state.settings as SettingsState).configurations.configuration)[
    configurationCode
  ];

/**
 * Returns the fetched status.
 *
 * @param state - Application state.
 * @param configurationCode - Configuration code.
 *
 * @returns - If configuration is fetched or not.
 */
export const isConfigurationFetched = (
  state: StoreState,
  configurationCode: Configuration['code'],
) =>
  (!!getEntityById(state, 'configurations', configurationCode) ||
    !!getConfigurationError(state, configurationCode)) &&
  !isConfigurationLoading(state, configurationCode);

/**
 * Returns a specific configuration by its code.
 *
 * @param state      - Application state.
 * @param configurationCode - Configuration code.
 *
 * @returns Configuration normalized or undefined if nothing found.
 */
export const getConfiguration = (
  state: StoreState,
  configurationCode: Configuration['code'],
) => getEntityById(state, 'configurations', configurationCode);
