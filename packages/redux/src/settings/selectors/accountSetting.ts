import {
  getError,
  getIsLoading,
  getResult,
} from '../reducer/accountSetting.js';
import type { AccountSetting } from '@farfetch/blackout-client';
import type { SettingsState } from '../types/index.js';
import type { StoreState } from '../../types/index.js';

/**
 * Retrieves the error status of a account setting by its id.
 *
 * @param state - Application state.
 * @param settingId - Setting identifier.
 *
 * @returns Error information (`undefined` if there are no errors).
 */
export const getAccountSettingError = (
  state: StoreState,
  settingId: AccountSetting['id'],
) => getError((state.settings as SettingsState).accountSetting)?.[settingId];

/**
 * Retrieves the loading state of a account setting by its id.
 *
 * @param state - Application state.
 * @param settingId - Setting identifier.
 *
 * @returns - Loading status of a setting.
 */
export const isAccountSettingLoading = (
  state: StoreState,
  settingId: AccountSetting['id'],
) =>
  getIsLoading((state.settings as SettingsState).accountSetting)?.[settingId];

/**
 * Returns the fetched status.
 *
 * @param state - Application state.
 * @param settingId - Setting identifier.
 *
 * @returns - If account setting is fetched or not.
 */
export const isAccountSettingFetched = (
  state: StoreState,
  settingId: AccountSetting['id'],
) =>
  (!!getResult((state.settings as SettingsState).accountSetting)?.[settingId] ||
    !!getAccountSettingError(state, settingId)) &&
  !isAccountSettingLoading(state, settingId);

/**
 * Returns a specific account setting by its id.
 *
 * @param state      - Application state.
 * @param settingId - Setting identifier.
 *
 * @returns Setting normalized or undefined if nothing found.
 */
export const getAccountSetting = (
  state: StoreState,
  settingId: AccountSetting['id'],
) => getResult((state.settings as SettingsState).accountSetting)?.[settingId];
