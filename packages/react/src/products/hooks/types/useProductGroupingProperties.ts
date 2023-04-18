import type {
  Config,
  GetProductGroupingPropertiesQuery,
} from '@farfetch/blackout-client';

export type UseProductGroupingPropertiesOptions = {
  fetchConfig?: Config;
  enableAutoFetch?: boolean;
  fetchQuery?: GetProductGroupingPropertiesQuery;
};
