import type { Config, QuerySearchUserReturns } from '@farfetch/blackout-client';

export type UseReturnsOptions = {
  enableAutoFetch?: boolean;
  fetchConfig?: Config;
  fetchQuery?: QuerySearchUserReturns;
};
