import type {
  Config,
  GetProductGroupingQuery,
} from '@farfetch/blackout-client';

export type UseProductGroupingOptions = {
  fetchConfig?: Config;
  enableAutoFetch?: boolean;
  fetchQuery?: GetProductGroupingQuery;
};
