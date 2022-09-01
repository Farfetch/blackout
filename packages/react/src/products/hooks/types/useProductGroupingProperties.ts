import type {
  Config,
  GroupingPropertiesQuery,
} from '@farfetch/blackout-client';

export type UseProductGroupingPropertiesOptions = {
  fetchConfig?: Config;
  enableAutoFetch?: boolean;
  fetchQuery?: GroupingPropertiesQuery;
};
