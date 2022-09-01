import type { Config, GroupingQuery } from '@farfetch/blackout-client';

export type UseProductGroupingOptions = {
  fetchConfig?: Config;
  enableAutoFetch?: boolean;
  fetchQuery?: GroupingQuery;
};
