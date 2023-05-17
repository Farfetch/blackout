import type { Config, ConfigurationsQuery } from '@farfetch/blackout-client';

export type UseConfigurationsOptions = {
  enableAutoFetch?: boolean;
  fetchQuery?: ConfigurationsQuery;
  fetchConfig?: Config;
};
