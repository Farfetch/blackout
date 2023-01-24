import type { Config, GetUserOrdersQuery } from '@farfetch/blackout-client';

export type UseUserOrdersOptions = {
  enableAutoFetch?: boolean;
  fetchConfig?: Config;
  fetchQuery?: GetUserOrdersQuery;
};
