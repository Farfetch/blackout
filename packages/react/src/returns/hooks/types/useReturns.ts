import type { Config, GetUserReturnsQuery } from '@farfetch/blackout-client';

export type UseReturnsOptions = {
  enableAutoFetch?: boolean;
  fetchConfig?: Config;
  fetchQuery?: GetUserReturnsQuery;
};
