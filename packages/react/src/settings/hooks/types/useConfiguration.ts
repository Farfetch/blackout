import type { Config, ConfigurationQuery } from '@farfetch/blackout-client';

export type UseConfigurationOptions = {
  enableAutoFetch?: boolean;
  fetchQuery?: ConfigurationQuery;
  fetchConfig?: Config;
};
