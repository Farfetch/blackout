import type { Config, GetUserReturnsQuery } from '@farfetch/blackout-client';

export type UseUserReturnsOptions = {
  enableAutoFetch?: boolean;
  fetchConfig?: Config;
  fetchQuery?: GetUserReturnsQuery;
};
