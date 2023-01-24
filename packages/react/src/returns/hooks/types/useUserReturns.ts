import type { Config, QuerySearchUserReturns } from '@farfetch/blackout-client';

export type UseUserReturnsOptions = {
  enableAutoFetch?: boolean;
  fetchConfig?: Config;
  fetchQuery?: QuerySearchUserReturns;
};
