import type { Config, GetUserOrdersQuery } from '@farfetch/blackout-client';

export type UseUserOrdersOptions = {
  enableAutoFetch?: boolean;
  fetchAllUserOrders?: boolean;
  fetchConfig?: Config;
  fetchQuery?: GetUserOrdersQuery;
};
