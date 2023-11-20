import type {
  AccountSetting,
  BlackoutError,
  Configuration,
} from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export type ConfigurationsState = CombinedState<{
  error: BlackoutError | null;
  isLoading: boolean;
  result: Array<Configuration['code']> | null;
  configuration: ConfigurationState;
}>;

export type ConfigurationState = {
  error: Record<Configuration['code'], BlackoutError | null>;
  isLoading: Record<Configuration['code'], boolean>;
};

export type AccountSettingsState = CombinedState<{
  error: Record<string, BlackoutError | null> | null;
  isLoading: Record<string, boolean>;
  result: Record<string, Array<AccountSetting>> | null;
}>;

export type AccountSettingState = CombinedState<{
  error: Record<AccountSetting['id'], BlackoutError | null> | null;
  isLoading: Record<AccountSetting['id'], boolean>;
  result: Record<AccountSetting['id'], AccountSetting> | null;
}>;

export type SettingsState = {
  configurations: ConfigurationsState;
  accountSettings: AccountSettingsState;
  accountSetting: AccountSettingState;
};
