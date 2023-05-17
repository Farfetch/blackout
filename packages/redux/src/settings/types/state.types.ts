import type { BlackoutError, Configuration } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export type ConfigurationsState = CombinedState<{
  error: BlackoutError | null;
  isLoading: boolean;
  result: Array<Configuration['code']> | null;
  configuration: ConfigurationState;
}>;

export type SettingsState = CombinedState<{
  configurations: ConfigurationsState;
}>;

export type ConfigurationState = {
  error: Record<Configuration['code'], BlackoutError | null>;
  isLoading: Record<Configuration['code'], boolean>;
};
