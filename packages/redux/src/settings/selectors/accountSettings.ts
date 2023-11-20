import { buildAccountSettingsQuery } from '../utils.js';
import {
  getError,
  getIsLoading,
  getResult,
} from '../reducer/accountSettings.js';
import type { AccountSettingsQuery } from '@farfetch/blackout-client';
import type { SettingsState } from '../types/index.js';
import type { StoreState } from '../../types/index.js';

/**
 * Retrieves the error status of a account settings by its id.
 *
 * @param state - Application state.
 * @param query - Query used when fetching the account settings, if you didn't use don't provide this argument
 *
 * @returns Error information (`undefined` if there are no errors).
 */
export const getAccountSettingsError = (
  state: StoreState,
  query?: AccountSettingsQuery,
) =>
  getError((state.settings as SettingsState).accountSettings)?.[
    buildAccountSettingsQuery(query)
  ];

/**
 * Retrieves the loading state of account settings by the used query params.
 *
 * @param state - Application state.
 * @param query - Query used when fetching the account settings, if you didn't use don't provide this argument
 *
 * @returns - Loading status of the account settings request.
 */
export const areAccountSettingsLoading = (
  state: StoreState,
  query?: AccountSettingsQuery,
) =>
  getIsLoading((state.settings as SettingsState).accountSettings)?.[
    buildAccountSettingsQuery(query)
  ];

/**
 * Returns the fetched status.
 *
 * @param state - Application state.
 * @param query - Query used when fetching the account settings, if you didn't use don't provide this argument
 *
 * @returns - If the account settings were fetched or not.
 */
export const areAccountSettingsFetched = (
  state: StoreState,
  query?: AccountSettingsQuery,
) =>
  (!!getResult((state.settings as SettingsState).accountSettings)?.[
    buildAccountSettingsQuery(query)
  ] ||
    !!getAccountSettingsError(state, query)) &&
  !areAccountSettingsLoading(state, query);

/**
 * Returns the list of settings of a specific query params
 *
 * @param state - Application state.
 * @param query - Query used when fetching the account settings, if you didn't use don't provide this argument
 *
 * @returns Setting normalized or undefined if nothing found.
 */
export const getAccountSettings = (
  state: StoreState,
  query?: AccountSettingsQuery,
) =>
  getResult((state.settings as SettingsState).accountSettings)?.[
    buildAccountSettingsQuery(query)
  ];
