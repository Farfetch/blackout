import type * as actionTypes from '../actionTypes.js';
import type {
  AccountSetting,
  AccountSettings,
  BlackoutError,
  Configuration,
  Configurations,
} from '@farfetch/blackout-client';
import type { Action } from 'redux';
import type { NormalizedSchema } from 'normalizr';

type ConfigurationsPayload = NormalizedSchema<
  { configurations: Record<Configuration['code'], Configuration> },
  Configurations
>;

type ConfigurationPayload = NormalizedSchema<
  { configurations: Record<Configuration['code'], Configuration> },
  Configuration
>;

export interface FetchConfigurationsRequestAction extends Action {
  type: typeof actionTypes.FETCH_CONFIGURATIONS_REQUEST;
}
export interface FetchConfigurationsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_CONFIGURATIONS_SUCCESS;
  payload: ConfigurationsPayload;
}
export interface FetchConfigurationsFailureAction extends Action {
  type: typeof actionTypes.FETCH_CONFIGURATIONS_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch configurations request is made.
 */
export type FetchConfigurationsAction =
  | FetchConfigurationsRequestAction
  | FetchConfigurationsSuccessAction
  | FetchConfigurationsFailureAction;

export interface FetchConfigurationRequestAction extends Action {
  meta: { code: Configuration['code'] };
  type: typeof actionTypes.FETCH_CONFIGURATION_REQUEST;
}
export interface FetchConfigurationSuccessAction extends Action {
  meta: { code: Configuration['code'] };
  type: typeof actionTypes.FETCH_CONFIGURATION_SUCCESS;
  payload: ConfigurationPayload;
}
export interface FetchConfigurationFailureAction extends Action {
  meta: { code: Configuration['code'] };
  type: typeof actionTypes.FETCH_CONFIGURATION_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch configuration request is made.
 */
export type FetchConfigurationAction =
  | FetchConfigurationRequestAction
  | FetchConfigurationSuccessAction
  | FetchConfigurationFailureAction;
/**
 * Actions dispatched when the reset configurations is called.
 */
export interface ResetConfigurationsStateAction extends Action {
  type: typeof actionTypes.RESET_CONFIGURATIONS_STATE;
}

export interface FetchAccountSettingsRequestAction extends Action {
  type: typeof actionTypes.FETCH_ACCOUNT_SETTINGS_REQUEST;
}
export interface FetchAccountSettingsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_ACCOUNT_SETTINGS_SUCCESS;
  payload: AccountSettings;
}
export interface FetchAccountSettingsFailureAction extends Action {
  type: typeof actionTypes.FETCH_ACCOUNT_SETTINGS_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch settings request is made.
 */
export type FetchAccountSettingsAction =
  | FetchAccountSettingsRequestAction
  | FetchAccountSettingsSuccessAction
  | FetchAccountSettingsFailureAction;

export interface FetchAccountSettingRequestAction extends Action {
  type: typeof actionTypes.FETCH_ACCOUNT_SETTING_REQUEST;
}
export interface FetchAccountSettingSuccessAction extends Action {
  type: typeof actionTypes.FETCH_ACCOUNT_SETTING_SUCCESS;
  payload: AccountSetting;
}
export interface FetchAccountSettingFailureAction extends Action {
  type: typeof actionTypes.FETCH_ACCOUNT_SETTING_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch setting request is made.
 */
export type FetchAccountSettingAction =
  | FetchAccountSettingRequestAction
  | FetchAccountSettingSuccessAction
  | FetchAccountSettingFailureAction;
