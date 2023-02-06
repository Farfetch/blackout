import type { Config, GetUserOrdersQuery } from '@farfetch/blackout-client';

export type UseOrdersOptions = {
  enableAutoFetch?: boolean;
  fetchAllUserOrders?: boolean;
  fetchConfig?: Config;
  fetchQuery?: GetUserOrdersQuery;
};
